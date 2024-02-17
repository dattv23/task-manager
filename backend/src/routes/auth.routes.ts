import { Router } from 'express'
import { authController } from '~/controllers/auth.controllers'
import validateData from '~/middlewares/validation.middlewares'
import { loginSchema, refreshTokenSchema, resendOTPSchema, resetPasswordSchema, userRegistrationSchema, verifyOTPSchema } from '~/schemas/auth.schemas'
import { wrapRequestHandler } from '~/utils/handler'

const authRouter = Router()

authRouter.post('/register', validateData(userRegistrationSchema), wrapRequestHandler(authController.register))
authRouter.post('/verify-otp', validateData(verifyOTPSchema), wrapRequestHandler(authController.verifyOTP))
authRouter.post('/resend-otp', validateData(resendOTPSchema), wrapRequestHandler(authController.resendOTP))
authRouter.post('/reset-password', validateData(resetPasswordSchema), wrapRequestHandler(authController.resetPassword))
authRouter.post('/login', validateData(loginSchema), wrapRequestHandler(authController.login))
authRouter.post('/refresh-token', validateData(refreshTokenSchema), wrapRequestHandler(authController.refreshToken))

export default authRouter
