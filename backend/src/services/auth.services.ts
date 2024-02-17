import { ResultLoginType, ResultNewTokenType, ResultRegisterType } from '~/@types/response.types'
import User from '~/models/database/User'
import { LoginBody, NewTokenBody, RegisterBody, ResendOTPBody, ResetPasswordBody, VerifyOTPBody } from '~/models/requests/auth.requests'
import { databaseService } from './database.services'
import { hashText } from '~/utils/crypto'
import OTP from '~/models/database/OTP'
import { sendOTP } from '~/utils/email'
import { ErrorWithStatus } from '~/models/Error'
import { StatusCodes } from 'http-status-codes'
import { RESULT_RESPONSE_MESSAGES, VALIDATION_MESSAGES } from '~/constants/messages'
import tokenServices from './token.services'
import RefreshToken from '~/models/database/RefreshToken'
import { UserVerifyStatus } from '~/constants/enums'
import { verifyToken } from '~/utils/jwt'
import { env } from '~/config/env.config'
import { JsonWebTokenError } from 'jsonwebtoken'

class AuthServices {
  async register(payload: RegisterBody): Promise<ResultRegisterType> {
    const { fullName, email, password } = payload
    const hashedPassword = hashText(password)
    const newUser = new User({
      ...payload,
      password: hashedPassword
    })
    const userResult = await databaseService.users.insertOne(newUser)
    const otp = await sendOTP(email)
    const newOTP = new OTP({
      code: hashText(otp),
      email: email
    })
    await databaseService.otps.insertOne(newOTP)
    const userId = userResult.insertedId.toString()
    const content: ResultRegisterType = { userId, fullName, email }
    return content
  }

  async verifyOTP(payload: VerifyOTPBody): Promise<boolean> {
    const { email, code } = payload
    const otp = await databaseService.otps.findOne({ email })
    if (!email) {
      throw new ErrorWithStatus({ statusCode: StatusCodes.NOT_FOUND, message: RESULT_RESPONSE_MESSAGES.AUTH.VERIFY_OTP.IS_EXPIRED })
    }
    if (hashText(code) !== otp?.code) {
      throw new ErrorWithStatus({ statusCode: StatusCodes.NOT_FOUND, message: RESULT_RESPONSE_MESSAGES.AUTH.VERIFY_OTP.IS_INCORRECT })
    }
    await databaseService.users.findOneAndUpdate({ email }, { $set: { verify: UserVerifyStatus.Verified } })
    return true
  }

  async resendOTP(payload: ResendOTPBody): Promise<boolean> {
    const { email } = payload
    const user = await databaseService.users.findOne({ email })
    if (!user) {
      throw new ErrorWithStatus({ statusCode: StatusCodes.NOT_FOUND, message: RESULT_RESPONSE_MESSAGES.AUTH.RESEND_OTP.EMAIL_NOT_EXIST })
    }
    const otp = await sendOTP(email)
    const newOTP = new OTP({
      code: hashText(otp),
      email: email
    })
    await databaseService.otps.findOneAndDelete({ email })
    await databaseService.otps.insertOne(newOTP)
    return true
  }

  async resetPassword(payload: ResetPasswordBody): Promise<boolean> {
    const { email, password } = payload
    const user = await databaseService.users.findOneAndUpdate({ email }, { $set: { password: hashText(password) } })
    if (!user) {
      throw new ErrorWithStatus({ statusCode: StatusCodes.NOT_FOUND, message: RESULT_RESPONSE_MESSAGES.AUTH.RESET_PASSWORD.EMAIL_NOT_EXIST })
    }
    return true
  }

  async login(payload: LoginBody): Promise<ResultLoginType> {
    const { email, password } = payload
    const user = await databaseService.users.findOne({ email })
    if (!user) {
      throw new ErrorWithStatus({ statusCode: StatusCodes.NOT_FOUND, message: RESULT_RESPONSE_MESSAGES.AUTH.LOGIN.EMAIL_NOT_EXIST })
    }
    if (user.password !== hashText(password)) {
      throw new ErrorWithStatus({ statusCode: StatusCodes.NOT_FOUND, message: RESULT_RESPONSE_MESSAGES.AUTH.LOGIN.PASSWORD_INCORRECT })
    }
    if (user.verify === UserVerifyStatus.Unverified) {
      throw new ErrorWithStatus({ statusCode: StatusCodes.UNAUTHORIZED, message: RESULT_RESPONSE_MESSAGES.AUTH.LOGIN.ACCOUNT_UNVERIFIED })
    }
    const { _id, fullName } = user
    const [accessToken, refreshToken] = await tokenServices.signAccessAndRefreshToken(user._id.toString(), user.role)
    await databaseService.refreshTokens.deleteOne({ user_id: user._id })
    await databaseService.refreshTokens.insertOne(
      new RefreshToken({
        token: refreshToken,
        user_id: user._id
      })
    )
    const content: ResultLoginType = { userId: _id.toString(), email, fullName, accessToken, refreshToken }
    return content
  }

  async newToken(payload: NewTokenBody): Promise<ResultNewTokenType> {
    const { refreshToken } = payload
    const { refreshTokenKey } = env.jwt
    const { userID, role } = await verifyToken({ token: refreshToken, privateKey: refreshTokenKey! })
    const token = await databaseService.refreshTokens.findOneAndDelete({ token: refreshToken })
    if (!token) {
      throw new ErrorWithStatus({
        statusCode: StatusCodes.UNAUTHORIZED,
        message: RESULT_RESPONSE_MESSAGES.AUTH.NEW_TOKEN.REFRESH_TOKEN_EXPIRED
      })
    }
    const [newAccessToken, newRefreshToken] = await tokenServices.signAccessAndRefreshToken(userID, role)
    await databaseService.refreshTokens.insertOne(new RefreshToken({ token: newRefreshToken, user_id: userID }))
    const content: ResultNewTokenType = { accessToken: newAccessToken, refreshToken: newRefreshToken }
    return content
  }
}

const authServices = new AuthServices()
export default authServices