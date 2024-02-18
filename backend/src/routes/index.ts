import { Router } from 'express'
import authRouter from './auth.routes'
import usersRouter from './users.routes'

const rootRouter = Router()

rootRouter.use('/auth', authRouter)
rootRouter.use('/users', usersRouter)

export default rootRouter
