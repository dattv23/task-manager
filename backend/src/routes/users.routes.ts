import { Router } from 'express'
import { usersController } from '~/controllers/users.controllers'
import { authMiddleware } from '~/middlewares/auth.middlewares'
import { uploadMiddleware } from '~/middlewares/upload.middlewares'
import { wrapRequestHandler } from '~/utils/handler'

const usersRouter = Router()

usersRouter.get('/@me/profile', wrapRequestHandler(authMiddleware), wrapRequestHandler(usersController.getProfile))
usersRouter.put('/@me/avatar', wrapRequestHandler(authMiddleware), wrapRequestHandler(uploadMiddleware.singleImage), wrapRequestHandler(usersController.uploadAvatar))

export default usersRouter
