import { Request, Response, NextFunction } from 'express'
import z from 'zod'

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
