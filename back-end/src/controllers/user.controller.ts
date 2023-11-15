import { Request, Response } from 'express'
import { userService } from '../services/user.service'
import { StatusCodes } from 'http-status-codes'
import { validationResult } from 'express-validator'
import generateTokens from '../utils/generateToken'
import { TUser } from '../types/user.type'
import { sendOTP } from '../providers/sendMail'

const userController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const users = await userService.getAllUser()
      res.status(StatusCodes.OK).json({ error: false, users })
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: true, message: 'Internal Server Error' })
    }
  },
  register: async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() })
        return
      }

      const userId = await userService.createUser(req.body)
      const { error, message } = sendOTP(req.body.email)
      if (!error) {
        await userService.saveOTP(req.body.email, message)
      }
      res.status(StatusCodes.CREATED).json({ error: false, message: 'Account created sucessfully', id: userId })
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: true, message: 'Internal Server Error' })
    }
  },
  verifyUser: async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() })
        return
      }

      const checkOtp = await userService.verifyUser(req.body.email, req.body.code)
      if (!checkOtp) {
        res.status(StatusCodes.NOT_FOUND).json({ error: true, message: 'Code OTP incorect' })
      }
      const user = (await userService.updateUserVerified(req.body.email)) as TUser
      const { accessToken, refreshToken } = await generateTokens(user._id, user.roles)
      res.cookie('accessToken', accessToken, { httpOnly: true, maxAge: 1000 * 60 * 20 })
      res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 30 })

      res.status(200).json({
        error: false, message: 'Verify user sucessfully', accessToken, refreshToken
      })
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: true, message: 'Internal Server Error' })
    }
  },
  resendVerifyUser: async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() })
        return
      }

      const { error, message } = sendOTP(req.body.email)
      if (!error) {
        await userService.saveOTP(req.body.email, message)
        res.status(StatusCodes.CREATED).json({ message: 'Send otp successfully' })
      }
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: true, message: 'Internal Server Error' })
    }
  },
  refreshToken: async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() })
        return
      }

      const newAccessToken = await userService.createNewAccessToken(req.cookies.refreshToken)
      res.cookie('accessToken', newAccessToken, { httpOnly: true, maxAge: 1000 * 60 * 20 })
      res.status(StatusCodes.CREATED).json({ error: false, message: 'Create new accessToken successfully', accessToken: newAccessToken })
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: true, message: 'Internal Server Error' })
    }
  },
  logout: async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() })
        return
      }

      await userService.deleteRefreshToken(req.body.refreshToken)
      res.clearCookie('refreshToken')
      res.status(StatusCodes.OK).json({ error: false, message: 'Logout successfully' })
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: true, message: 'Internal Server Error' })
    }
  },
  login: async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() })
        return
      }
      const user = await userService.getUserByEmail(req.body.email) as TUser
      const { accessToken, refreshToken } = await generateTokens(user._id, user.roles)

      // httpOnly: true để chỉ mỗi server lấy được cookies còn client thì không
      res.cookie('accessToken', accessToken, { httpOnly: true, maxAge: 1000 * 60 * 20 })
      res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 30 })

      res.status(StatusCodes.OK).json({ error: false, message: 'Login successfully' })
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: true, message: 'Internal Server Error' })
    }
  }
}

export { userController }