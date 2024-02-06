import { Router } from 'express'
import { userController } from '~/controllers/user.controllers'
import validateData from '~/middlewares/validation.middlewares'
import { resendOTP, userRegistrationSchema, verifyOTPSchema } from '~/schemas/user.schemas'
import { wrapRequestHandler } from '~/utils/handler'

const userRouter = Router()

userRouter.post('/register', validateData(userRegistrationSchema), wrapRequestHandler(userController.register))
userRouter.post('/verify-otp', validateData(verifyOTPSchema), wrapRequestHandler(userController.verifyOTP))
userRouter.post('/resend-otp', validateData(resendOTP), wrapRequestHandler(userController.resendOTP))

export default userRouter
