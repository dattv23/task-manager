/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { validationResult } from 'express-validator'
import { sendOTP } from '../providers/sendMail'
import userService from '../services/user.service'
import tokenService from '../services/token.service'
import { LoginBody, RegisterBody, ResendVerifyUserBody, VerifyUserBody } from '../models/requests/user.request'
import { env } from '../config/environment'
import { User } from '../types'
import { UserVerifyStatus } from '../constants/enum'
import hashData from '../utils/hashData'

const userController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const users = await userService.getAllUser()
      res.status(StatusCodes.OK).json({ users })
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error })
    }
    return
  },
  register: async (req: Request<any, any, RegisterBody>, res: Response) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() })
        return
      }

      const userId = await userService.createUser({ name: req.body.name, email: req.body.email, password: hashData(req.body.password) })
      const code = await sendOTP(req.body.email)
      await userService.saveOTP({ email: req.body.email, code: code })
      res.status(StatusCodes.CREATED).json({ message: 'Account created successfully', id: userId })
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error })
    }
    return
  },
  verifyUser: async (req: Request<any, any, VerifyUserBody>, res: Response) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() })
        return
      }

      const checkOtp = await userService.verifyUser({ email: req.body.email, code: req.body.code })
      if (!checkOtp) {
        res.status(StatusCodes.NOT_FOUND).json({ message: 'Code OTP incorrect' })
        return
      }
      const user = (await userService.updateUserVerified(req.body.email)) as User
      const { accessToken, refreshToken } = await tokenService.generateTokens(user._id!, user.role!)
      await tokenService.saveRefreshToken(user._id!, refreshToken)
      res.cookie('accessToken', accessToken, { httpOnly: true, maxAge: env.ACCESS_TOKEN_EXPIRY_TIME * 60 * 1000 })
      res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: env.REFRESH_TOKEN_EXPIRY_TIME * 60 * 1000 })

      res.status(200).json({ message: 'Verify user successfully', accessToken, refreshToken })
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error })
    }
    return
  },
  resendVerifyUser: async (req: Request<any, any, ResendVerifyUserBody>, res: Response) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() })
        return
      }

      const code = await sendOTP(req.body.email)
      if (code) {
        await userService.saveOTP({ email: req.body.email, code: code })
        res.status(StatusCodes.CREATED).json({ message: 'Send otp successfully' })
      }
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error })
    }
    return
  },
  refreshToken: async (req: Request, res: Response) => {
    try {
      const newAccessToken = await tokenService.createNewAccessToken(req.cookies.refreshToken)
      res.cookie('accessToken', newAccessToken, { httpOnly: true, maxAge: env.ACCESS_TOKEN_EXPIRY_TIME * 60 * 1000 })
      res.status(StatusCodes.CREATED).json({ message: 'Create new accessToken successfully', accessToken: newAccessToken })
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error })
    }
    return
  },
  logout: async (req: Request, res: Response) => {
    try {
      await tokenService.deleteRefreshToken(req.cookies.refreshToken)
      res.clearCookie('refreshToken')
      res.status(StatusCodes.OK).json({ message: 'Logout successfully' })
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error })
    }
    return
  },
  login: async (req: Request<any, any, LoginBody>, res: Response) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() })
        return
      }

      const user = (await userService.getUserByEmail(req.body.email)) as User

      if (user.status === UserVerifyStatus.Unverified) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Please verify account!' })
        return
      }

      const { accessToken, refreshToken } = await tokenService.generateTokens(user._id!, user.role!)

      await tokenService.saveRefreshToken(user._id!, refreshToken)

      // httpOnly: true to server can get data from cookie and client can't get data from cookie
      res.cookie('accessToken', accessToken, { httpOnly: true, maxAge: env.ACCESS_TOKEN_EXPIRY_TIME * 60 * 1000 })
      res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: env.REFRESH_TOKEN_EXPIRY_TIME * 60 * 1000 })
      res.status(StatusCodes.OK).json({ message: 'Login successfully', accessToken: accessToken, refreshToken: refreshToken })

    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error })
    }
  }
}

export { userController }