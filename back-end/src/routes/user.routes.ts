import express from 'express'
import userController from '../controllers/user.controller'
import { validateLogin, validateRefreshToken, validateRegisterUser, validateResendVerifyUser, validateVerifyUser } from '../validations/validator'
import auth from '../middlewares/auth'
import refreshTokenController from '../controllers/refreshToken.controller'
const userRouter = express.Router()

userRouter.post('/register', validateRegisterUser(), userController.register)
userRouter.post('/verify-user', validateVerifyUser(), userController.verifyUser)
userRouter.post('/resend-verify-user', validateResendVerifyUser(), userController.resendVerifyUser)
userRouter.post('/login', validateLogin(), userController.login)
userRouter.get('/details', auth, userController.getDetailUser)
userRouter.post('/refresh-token', validateRefreshToken(), refreshTokenController.createNewAccessToken)
userRouter.post('/logout', validateRefreshToken(), refreshTokenController.logout)

export = userRouter
