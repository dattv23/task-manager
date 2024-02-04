import { Router, Request, Response } from 'express'
import { sendResponse } from '~/config/response.config'

const userRouter = Router()

userRouter.get('/', (req: Request, res: Response) => {
  sendResponse.success(res, [], 'Get users')
})

export default userRouter
