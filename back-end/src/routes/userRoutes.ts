import express from 'express'
import userController from '../controller/userController'
import { validateLogin, validateRefreshToken, validateRegisterUser, validateResendVerifyUser, validateVerifyUser } from '../utils/validator'
import auth from '../middleware/auth'
import refreshTokenController from '../controller/refreshTokenController'
const userRouter = express.Router()

userRouter.post('/register', validateRegisterUser(), userController.register)
userRouter.post('/verify-user', validateVerifyUser(), userController.verifyUser)
userRouter.post('/resend-verify-user', validateResendVerifyUser(), userController.resendVerifyUser)
userRouter.post('/login', validateLogin(), userController.login)
userRouter.get('/details', auth, userController.getDetailUser)
userRouter.post('/refresh-token', validateRefreshToken(), refreshTokenController.createNewAccessToken)
userRouter.post('/logout', validateRefreshToken(), refreshTokenController.logout)

export = userRouter
