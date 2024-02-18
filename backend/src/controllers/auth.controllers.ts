import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { sendResponse } from '~/config/response.config'
import { RESULT_RESPONSE_MESSAGES } from '~/constants/messages'
import { LoginBody, NewTokenBody, RegisterBody, ResendOTPBody, ResetPasswordBody, VerifyOTPBody } from '~/models/requests/auth.requests'
import authServices from '~/services/auth.services'

export const authController = {
  register: async (req: Request<ParamsDictionary, any, RegisterBody>, res: Response, next: NextFunction) => {
    const result = await authServices.register(req.body)
    return sendResponse.created(res, result, RESULT_RESPONSE_MESSAGES.AUTH.REGISTER.IS_SUCCESS)
  },

  verifyOTP: async (req: Request<ParamsDictionary, any, VerifyOTPBody>, res: Response, next: NextFunction) => {
    await authServices.verifyOTP(req.body)
    return sendResponse.success(res, {}, RESULT_RESPONSE_MESSAGES.AUTH.VERIFY_OTP.IS_SUCCESS)
  },

  resendOTP: async (req: Request<ParamsDictionary, any, ResendOTPBody>, res: Response, next: NextFunction) => {
    await authServices.resendOTP(req.body)
    return sendResponse.success(res, {}, RESULT_RESPONSE_MESSAGES.AUTH.RESEND_OTP.IS_SUCCESS)
  },

  resetPassword: async (req: Request<ParamsDictionary, any, ResetPasswordBody>, res: Response, next: NextFunction) => {
    await authServices.resetPassword(req.body)
    return sendResponse.success(res, {}, RESULT_RESPONSE_MESSAGES.AUTH.RESET_PASSWORD.IS_SUCCESS)
  },

  login: async (req: Request<ParamsDictionary, any, LoginBody>, res: Response, next: NextFunction) => {
    const result = await authServices.login(req.body)
    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.AUTH.LOGIN.IS_SUCCESS)
  },

  refreshToken: async (req: Request<ParamsDictionary, any, NewTokenBody>, res: Response, next: NextFunction) => {
    const result = await authServices.newToken(req.body)
    return sendResponse.created(res, result, RESULT_RESPONSE_MESSAGES.AUTH.NEW_TOKEN.IS_SUCCESS)
  }
}
