import express from 'express'
import { userMiddeleware } from '../../middlewares/user.middleware'
import { userController } from '../../controllers/user.controller'
import auth from '../../middlewares/auth.middelware'

const Router = express.Router()

Router.get('/',
  auth,
  userController.getAll
)

Router.post('/register',
  userMiddeleware.validateRegister(),
  userController.register
)

Router.post('/verify-user',
  userMiddeleware.validateVerifyUser(),
  userController.verifyUser
)

Router.post('/resend-verify-user',
  userMiddeleware.validateResendVerifyUser(),
  userController.resendVerifyUser
)

Router.get('/refresh-token',
  userController.refreshToken
)

Router.get('/logout',
  userMiddeleware.validateRefreshToken(),
  userController.logout
)

Router.post('/login',
  userMiddeleware.validateLogin(),
  userController.login
)

export const userRoutes = Router
