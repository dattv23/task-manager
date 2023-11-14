import { Request, Response } from 'express'
import { userService } from '../services/user.service'
import { StatusCodes } from 'http-status-codes'
import { validationResult } from 'express-validator'

const userController = {
  register: async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() })
        return
      }

      const userId = await userService.createUser(req.body)
      res.status(StatusCodes.CREATED).json({ error: false, message: 'Account created sucessfully', id: userId })
    } catch (error) {
      // console.log(error)
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: true, message: 'Internal Server Error' })
    }
  },

  getAll: async (req: Request, res: Response) => {
    try {
      const users = await userService.getAllUser()
      res.status(StatusCodes.OK).json({ error: false, users })
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: true, message: 'Internal Server Error' })
    }
  }
}

export { userController }