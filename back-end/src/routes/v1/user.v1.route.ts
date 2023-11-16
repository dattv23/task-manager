import express from 'express'
import { userController } from '../../controllers/user.controller'
import auth from '../../middlewares/auth.middleware'
import userMiddleware from '../../middlewares/user.middleware'

const Router = express.Router()

Router.get('/',
  auth,
  userController.getAll
)

Router.post('/register',
  userMiddleware.validateRegister(),
  userController.register
)

Router.post('/verify-user',
  userMiddleware.validateVerifyUser(),
  userController.verifyUser
)

Router.post('/resend-verify-user',
  userMiddleware.validateResendVerifyUser(),
  userController.resendVerifyUser
)

Router.get('/refresh-token',
  userController.refreshToken
)

Router.get('/logout',
  userMiddleware.validateRefreshToken(),
  userController.logout
)

Router.post('/login',
  userMiddleware.validateLogin(),
  userController.login
)

export const userRoutes = Router
