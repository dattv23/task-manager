import { Router } from 'express'
import userRouter from './users.routes'

const rootRouter = Router()

rootRouter.use('/users', userRouter)

export default rootRouter
