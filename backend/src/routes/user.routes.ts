import { Router } from 'express'
import { userController } from '~/controllers/user.controllers'
import { registerValidator } from '~/middlewares/user.middlewares'

const userRouter = Router()

/**
 * Description: Register a new user
 * Path: /register
 * Method: POST
 * Body: { fullName: string, email: string, password: string }
 */
userRouter.post('/register', userController.register)

export default userRouter
