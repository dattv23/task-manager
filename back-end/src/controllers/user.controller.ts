/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { validationResult } from 'express-validator'
import { sendOTP } from '../providers/sendMail'
import userService from '../services/user.service'
import tokenService from '../services/token.service'
import { LoginBody, RegisterBody, ResendVerifyUserBody, VerifyUserBody } from '../models/requests/user.request'
import { env } from '../config/environment'

const userController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const users = await userService.getAllUser()
      res.status(StatusCodes.OK).json({ users })
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error })
    }
  },
  register: async (req: Request<any, any, RegisterBody>, res: Response) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() })
        return
      }

      const userId = await userService.createUser({ ...req.body, date_of_birth: new Date(req.body.date_of_birth) })
      const code = await sendOTP(req.body.email)
      await userService.saveOTP({ email: req.body.email, code: code })
      res.status(StatusCodes.CREATED).json({ message: 'Account created successfully', id: userId })
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error })
    }
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
      }
      const user = await userService.updateUserVerified(req.body.email)
      if (user) {
        const { accessToken, refreshToken } = await tokenService.generateTokens(user._id, user.role)
        res.cookie('accessToken', accessToken, { httpOnly: true, maxAge: env.ACCESS_TOKEN_EXPIRY_TIME * 60 * 1000 })
        res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: env.REFRESH_TOKEN_EXPIRY_TIME * 60 * 1000 })

        res.status(200).json({ message: 'Verify user successfully', accessToken, refreshToken })
      }
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error })
    }
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
  },
  refreshToken: async (req: Request, res: Response) => {
    try {
      const newAccessToken = await tokenService.createNewAccessToken(req.cookies.refreshToken)
      res.cookie('accessToken', newAccessToken, { httpOnly: true, maxAge: env.ACCESS_TOKEN_EXPIRY_TIME * 60 * 1000 })
      res.status(StatusCodes.CREATED).json({ message: 'Create new accessToken successfully', accessToken: newAccessToken })
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error })
    }
  },
  logout: async (req: Request, res: Response) => {
    try {
      await tokenService.deleteRefreshToken(req.cookies.refreshToken)
      res.clearCookie('refreshToken')
      res.status(StatusCodes.OK).json({ message: 'Logout successfully' })
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error })
    }
  },
  login: async (req: Request<any, any, LoginBody>, res: Response) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() })
        return
      }

      const user = await userService.getUserByEmail(req.body.email)

      if (user) {
        const { accessToken, refreshToken } = await tokenService.generateTokens(user._id, user.role)

        // httpOnly: true to server can get data from cookie and client can't get data from cookie
        res.cookie('accessToken', accessToken, { httpOnly: true, maxAge: env.ACCESS_TOKEN_EXPIRY_TIME * 60 * 1000 })
        res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: env.REFRESH_TOKEN_EXPIRY_TIME * 60 * 1000 })
        res.status(StatusCodes.OK).json({ message: 'Login successfully' })
      }

    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error })
    }
  }
}

export { userController }