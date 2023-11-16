import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { env } from '../config/environment'
import { StatusCodes } from 'http-status-codes'

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('x-access-token')
  if (!token)
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ error: true, message: 'Access Denied: No token provided' })

  try {
    const tokenDetails = jwt.verify(
      token,
      `${env.ACCESS_TOKEN_SECRET}`
    )
    req.body.user = tokenDetails
    next()
  } catch (err) {
    res
      .status(StatusCodes.FORBIDDEN)
      .json({ error: true, message: 'Access Denied: Invalid token' })
  }
}

export default auth
