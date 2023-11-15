import jwt from 'jsonwebtoken'
import { ObjectId } from 'mongodb'
import { ERoles } from '../types/user.type'
import { env } from '../config/environment'
import { userService } from '../services/user.service'

// require('crypto').randomBytes(64).toString('hex')
const generateTokens = async (_id: ObjectId, roles: ERoles[]) => {
  try {
    const payload = { _id: _id, roles: roles }
    const accessToken = jwt.sign(
      payload,
      `${env.ACCESS_TOKEN_SECRET}`,
      { expiresIn: '20m' }
    )
    const refreshToken = jwt.sign(
      payload,
      `${env.REFRESH_TOKEN_SECRET}`,
      { expiresIn: '30d' }
    )

    await userService.saveRefreshToken(_id, refreshToken)

    return Promise.resolve({ accessToken, refreshToken })
  } catch (err) {
    return Promise.reject(err)
  }
}

export default generateTokens
