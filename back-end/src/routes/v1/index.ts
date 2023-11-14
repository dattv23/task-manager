import express, { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { userRoutes } from './user.v1.route'

const Router = express.Router()

Router.get('/status', (req: Request, res: Response) => {
  res.status(StatusCodes.OK).send({
    message: 'APIs v1 are ready to use.'
  })
})

Router.use('/users', userRoutes)

export const APIs_V1 = Router