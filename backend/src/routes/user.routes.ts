import { Router } from 'express'
import { userController } from '~/controllers/user.controllers'
import validateData from '~/middlewares/validation.middlewares'
import { userRegistrationSchema } from '~/schemas/user.schemas'
import { wrapRequestHandler } from '~/utils/handler'

const userRouter = Router()

/**
 * Description: Register a new user
 * Path: /register
 * Method: POST
 * Body: { fullName: string, email: string, password: string }
 */
userRouter.post('/register', validateData(userRegistrationSchema), wrapRequestHandler(userController.register))

export default userRouter
