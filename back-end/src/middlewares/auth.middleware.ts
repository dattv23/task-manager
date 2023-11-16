import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { env } from '../config/environment'

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('x-access-token')
  if (!token)
    return res
      .status(403)
      .json({ error: true, message: 'Access Denied: No token provided' })

  try {
    const tokenDetails = jwt.verify(
      token,
      `${env.ACCESS_TOKEN_SECRET}`
    )
    // console.log(tokenDetails)
    req.body.user = tokenDetails
    next()
  } catch (err) {
    // console.log(err)
    res
      .status(403)
      .json({ error: true, message: 'Access Denied: Invalid token' })
  }
}

export default auth
