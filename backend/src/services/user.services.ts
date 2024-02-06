import { ResultRegisterType } from '~/@types/response.types'
import User from '~/models/database/User'
import { RegisterBody, ResendOTPBody, VerifyOTPBody } from '~/models/requests/user.requests'
import { databaseService } from './database.services'
import { hashText } from '~/utils/crypto'
import OTP from '~/models/database/OTP'
import { sendOTP } from '~/utils/email'
import { ErrorWithStatus } from '~/models/Error'
import { StatusCodes } from 'http-status-codes'
import { RESULT_RESPONSE_MESSAGES } from '~/constants/messages'

class UserServices {
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
    const user_id = userResult.insertedId.toString()
    const content: ResultRegisterType = { _id: user_id, fullName, email }
    return content
  }

  async verifyOTP(payload: VerifyOTPBody): Promise<boolean> {
    const { email, code } = payload
    const otp = await databaseService.otps.findOne({ email })
    if (!email) {
      throw new ErrorWithStatus({ statusCode: StatusCodes.NOT_FOUND, message: RESULT_RESPONSE_MESSAGES.VERIFY_OTP.IS_EXPIRED })
    }
    if (hashText(code) !== otp?.code) {
      throw new ErrorWithStatus({ statusCode: StatusCodes.BAD_REQUEST, message: RESULT_RESPONSE_MESSAGES.VERIFY_OTP.IS_INCORRECT })
    }
    return true
  }

  async resendOTP(payload: ResendOTPBody): Promise<boolean> {
    const { email } = payload
    const otp = await sendOTP(email)
    const newOTP = new OTP({
      code: hashText(otp),
      email: email
    })
    await databaseService.otps.findOneAndDelete({ email })
    await databaseService.otps.insertOne(newOTP)
    return true
  }
}

const userServices = new UserServices()
export default userServices
