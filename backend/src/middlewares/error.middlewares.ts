import { Request, Response, NextFunction } from 'express'
import { omit } from 'lodash'
import { StatusCodes } from 'http-status-codes'
import { ErrorWithStatus } from '~/models/Error'
import { ZodError } from 'zod'
import { sendResponse } from '~/config/response.config'
import { VALIDATION_MESSAGES } from '~/constants/messages'
import { JsonWebTokenError } from 'jsonwebtoken'

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  try {
    if (err instanceof ErrorWithStatus) {
      return res.status(err.statusCode).json(omit(err, ['statusCode']))
    }
    if (err instanceof ZodError) {
      const errorMessages = err.errors.map((issue: any) => ({
        path: issue.path[0],
        message: issue.message
      }))
      return sendResponse.validation(res, errorMessages, VALIDATION_MESSAGES.TITLE)
    }
    if (err instanceof JsonWebTokenError) {
      return sendResponse.unauthorized(res, {}, err.message)
    }
    // Print out stacktrace to find bug easier
    console.error(err)
    const finalError: any = {}
    Object.getOwnPropertyNames(err).forEach((key) => {
      if (!Object.getOwnPropertyDescriptor(err, key)?.configurable || !Object.getOwnPropertyDescriptor(err, key)?.writable) {
        return
      }
      finalError[key] = err[key]
    })
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: finalError.message,
      errorInfo: omit(finalError, ['stack'])
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'Internal server error',
      errorInfo: omit(error as any, ['stack'])
    })
  }
}
