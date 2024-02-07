import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { sendResponse } from '~/config/response.config'
import { RESULT_RESPONSE_MESSAGES } from '~/constants/messages'
import { LoginBody, RegisterBody, ResendOTPBody, ResetPasswordBody, VerifyOTPBody } from '~/models/requests/user.requests'
import userServices from '~/services/user.services'

export const userController = {
  register: async (req: Request<ParamsDictionary, any, RegisterBody>, res: Response, next: NextFunction) => {
    const result = await userServices.register(req.body)
    return sendResponse.created(res, result, RESULT_RESPONSE_MESSAGES.REGISTER.IS_SUCCESS)
  },

  verifyOTP: async (req: Request<ParamsDictionary, any, VerifyOTPBody>, res: Response, next: NextFunction) => {
    await userServices.verifyOTP(req.body)
    return sendResponse.success(res, {}, RESULT_RESPONSE_MESSAGES.VERIFY_OTP.IS_SUCCESS)
  },

  resendOTP: async (req: Request<ParamsDictionary, any, ResendOTPBody>, res: Response, next: NextFunction) => {
    await userServices.resendOTP(req.body)
    return sendResponse.success(res, {}, RESULT_RESPONSE_MESSAGES.RESEND_OTP.IS_SUCCESS)
  },

  resetPassword: async (req: Request<ParamsDictionary, any, ResetPasswordBody>, res: Response, next: NextFunction) => {
    await userServices.resetPassword(req.body)
    return sendResponse.success(res, {}, RESULT_RESPONSE_MESSAGES.RESET_PASSWORD.IS_SUCCESS)
  },

  login: async (req: Request<ParamsDictionary, any, LoginBody>, res: Response, next: NextFunction) => {
    await userServices.login(req.body)
    return sendResponse.success(res, {}, RESULT_RESPONSE_MESSAGES.LOGIN.IS_SUCCESS)
  }
}
