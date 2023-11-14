import express from 'express'
import { userMiddeleware } from '../../middlewares/user.middlewares'
import { userController } from '../../controllers/user.controller'

const Router = express.Router()

Router.get('/',
  userController.getAll
)

Router.post('/register',
  userMiddeleware.validateRegister(),
  userController.register
)

export const userRoutes = Router
