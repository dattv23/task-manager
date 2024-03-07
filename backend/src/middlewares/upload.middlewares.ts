import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import multer from 'multer'
import { ErrorWithStatus } from '~/models/Error'
import { uploadImage } from '~/utils/file'

export const uploadMiddleware = {
  singleImage: (req: Request, res: Response, next: NextFunction) => {
    const id = req.body.userId
    uploadImage.single('image')(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        next(
          new ErrorWithStatus({
            statusCode: StatusCodes.BAD_REQUEST,
            message: err.message
          })
        )
      }

      if (err instanceof Error) {
        next(
          new ErrorWithStatus({
            statusCode: StatusCodes.BAD_REQUEST,
            message: err.message
          })
        )
      }

      req.body.userId = id
      next()
    })
  }
}
