import { Router } from 'express'
import { tasksController } from '~/controllers/tasks.controllers'
import { authMiddleware } from '~/middlewares/auth.middlewares'
import validateData from '~/middlewares/validation.middlewares'
import { taskSchema } from '~/schemas/tasks.schemas'
import { wrapRequestHandler } from '~/utils/handler'

const tasksRouter = Router()

tasksRouter.get('/', wrapRequestHandler(authMiddleware), wrapRequestHandler(tasksController.getTasks))
tasksRouter.post('/', wrapRequestHandler(authMiddleware), validateData(taskSchema), wrapRequestHandler(tasksController.createTask))

export default tasksRouter
