import { Router } from 'express'
import { tasksController } from '~/controllers/tasks.controllers'
import { authMiddleware } from '~/middlewares/auth.middlewares'
import validateData from '~/middlewares/validation.middlewares'
import { editTaskSchema, taskSchema } from '~/schemas/tasks.schemas'
import { wrapRequestHandler } from '~/utils/handler'

const tasksRouter = Router()

tasksRouter.get('/', wrapRequestHandler(authMiddleware), wrapRequestHandler(tasksController.getTasks))
tasksRouter.get('/:id', wrapRequestHandler(authMiddleware), wrapRequestHandler(tasksController.getTaskById))
tasksRouter.post('/', wrapRequestHandler(authMiddleware), validateData(taskSchema), wrapRequestHandler(tasksController.createTask))
tasksRouter.put('/:id', wrapRequestHandler(authMiddleware), validateData(editTaskSchema), wrapRequestHandler(tasksController.editTask))
tasksRouter.delete('/:id', wrapRequestHandler(authMiddleware), wrapRequestHandler(tasksController.deleteTask))

export default tasksRouter
