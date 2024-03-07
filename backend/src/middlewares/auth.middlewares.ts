import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { TokenPayloadType } from '~/@types/token.type'
import { env } from '~/config/env.config'
import { ErrorWithStatus } from '~/models/Error'
import { verifyToken } from '~/utils/jwt'

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    throw new ErrorWithStatus({ statusCode: StatusCodes.UNAUTHORIZED, message: 'Please try login again!' })
  }
  const { userId } = (await verifyToken({ token: token, privateKey: env.jwt.accessTokenKey! })) as TokenPayloadType
  req.body.userId = userId
  return next()
}
