import { Router } from 'express'
import { userController } from '~/controllers/user.controllers'
import validateData from '~/middlewares/validation.middlewares'
import { loginSchema, newTokenSchema, resendOTPSchema, resetPasswordSchema, userRegistrationSchema, verifyOTPSchema } from '~/schemas/user.schemas'
import { wrapRequestHandler } from '~/utils/handler'

const userRouter = Router()

userRouter.post('/register', validateData(userRegistrationSchema), wrapRequestHandler(userController.register))
userRouter.post('/verify-otp', validateData(verifyOTPSchema), wrapRequestHandler(userController.verifyOTP))
userRouter.post('/resend-otp', validateData(resendOTPSchema), wrapRequestHandler(userController.resendOTP))
userRouter.post('/reset-password', validateData(resetPasswordSchema), wrapRequestHandler(userController.resetPassword))
userRouter.post('/login', validateData(loginSchema), wrapRequestHandler(userController.login))
userRouter.post('/new-token', validateData(newTokenSchema), wrapRequestHandler(userController.newToken))

export default userRouter
