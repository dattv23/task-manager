import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { generators } from 'openid-client'
import { env } from '~/config/env.config'
import { sendResponse } from '~/config/response.config'
import { RESULT_RESPONSE_MESSAGES } from '~/constants/messages'
import { LoginBody, NewTokenBody, RegisterBody, ResendOTPBody, ResetPasswordBody, VerifyOTPBody } from '~/models/requests/auth.requests'
import authServices from '~/services/auth.services'
import OpenIDClientService from '~/services/openidClient.services'
import usersServices from '~/services/users.services'

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
  },

  auth: async (req: Request, res: Response) => {
    try {
      const client = await OpenIDClientService.getClient()
      const code_verifier = generators.codeVerifier()
      const code_challenge = generators.codeChallenge(code_verifier)

      const authUrl = client.authorizationUrl({
        scope: 'openid email profile',
        code_challenge,
        code_challenge_method: 'S256',
        state: JSON.stringify({ code_verifier })
      })
      res.redirect(`${authUrl}`)
    } catch (error) {
      console.error('Error during auth initiation:', error)
      res.status(500).json({ error: 'Internal server error during auth initiation.' })
    }
  },

  callback: async (req: Request, res: Response) => {
    const client = await OpenIDClientService.getClient()
    const params = client.callbackParams(req)

    // Retrieve code_verifier from the state or query parameters
    const { code_verifier } = JSON.parse(params.state || '{}')

    if (!code_verifier) {
      return res.status(400).json({ error: 'Code verifier missing in request.' })
    }

    try {
      const tokenSet = await client.callback(`${env.server.domain}/api/auth/callback`, params, {
        code_verifier: code_verifier
      })
      const userinfo = await client.userinfo(tokenSet)
      const { email, birthdate, name, picture } = userinfo
      const { refreshToken } = await usersServices.createUser({ email: email!, password: email!, dateOfBirth: new Date(birthdate!), fullName: name!, avatar: picture! })
      res.redirect(`${env.server.domainFE}/oauth/${refreshToken}`)
    } catch (error) {
      res.status(500).json({ error: (error as Error).message })
    }
  }
}
