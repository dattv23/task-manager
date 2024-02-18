import { Router } from 'express'
import { usersController } from '~/controllers/users.controllers'
import { authMiddleware } from '~/middlewares/auth.middlewares'
import { wrapRequestHandler } from '~/utils/handler'

const usersRouter = Router()

usersRouter.get('/@me/profile', wrapRequestHandler(authMiddleware), wrapRequestHandler(usersController.getProfile))

export default usersRouter
