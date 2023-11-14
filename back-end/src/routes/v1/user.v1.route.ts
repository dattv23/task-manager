import express from 'express'
import { userValidation } from '../../validations/user.validation'
import { userController } from '../../controllers/user.controller'

const Router = express.Router()

Router.get('/',
  userController.getAll
)

Router.post('/register',
  userValidation.validateRegister(),
  userController.register
)

export const userRoutes = Router
