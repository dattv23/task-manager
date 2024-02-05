import { Request, Response, NextFunction } from 'express'
import { omit } from 'lodash'
import { z, ZodError } from 'zod'
import { sendResponse } from '~/config/response.config'
import { VALIDATION_MESSAGES } from '~/constants/messages'
import { ErrorWithStatus } from '~/models/Error'

const validateData = (schema: z.ZodObject<any, any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body)
      next()
    } catch (error) {
      next(error)
    }
  }
}

export default validateData
