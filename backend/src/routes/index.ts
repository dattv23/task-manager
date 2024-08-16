import { Router } from 'express'
import authRouter from './auth.routes'
import usersRouter from './users.routes'
import tasksRouter from './tasks.routes'
import mailRouter from './mail.route'

const rootRouter = Router()

rootRouter.use('/auth', authRouter)
rootRouter.use('/users', usersRouter)
rootRouter.use('/tasks', tasksRouter)
rootRouter.use('/mail', mailRouter)

export default rootRouter
