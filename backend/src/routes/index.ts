import { Router } from 'express'
import authRouter from './auth.routes'
import usersRouter from './users.routes'
import tasksRouter from './tasks.routes'

const rootRouter = Router()

rootRouter.use('/auth', authRouter)
rootRouter.use('/users', usersRouter)
rootRouter.use('/tasks', tasksRouter)

export default rootRouter
