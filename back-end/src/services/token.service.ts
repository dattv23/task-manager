import { ObjectId } from 'mongodb'
import { UserRole } from '../constants/enum'
import { env } from '../config/environment'
import jwt from 'jsonwebtoken'
import databaseServices from './database.service'
import createExpiryTime from '../utils/createExpiryTime'
import { Payload } from '../types/payload.type'

class TokenService {
  async generateAccessToken(_id: ObjectId, role: UserRole) {
    try {
      const payload = { _id: _id, role: role }
      const accessToken = jwt.sign(
        payload,
        `${env.ACCESS_TOKEN_SECRET}`,
        { expiresIn: `${env.ACCESS_TOKEN_EXPIRY_TIME}m` }
      )

      return Promise.resolve(accessToken)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async generateRefreshToken(_id: ObjectId, role: UserRole) {
    try {
      const payload = { _id: _id, role: role }
      const refreshToken = jwt.sign(
        payload,
        `${env.REFRESH_TOKEN_SECRET}`,
        { expiresIn: `${env.REFRESH_TOKEN_EXPIRY_TIME}m` }
      )

      return Promise.resolve(refreshToken)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async generateTokens(_id: ObjectId, role: UserRole) {
    try {
      const accessToken = await this.generateAccessToken(_id, role)
      const refreshToken = await this.generateRefreshToken(_id, role)

      return Promise.resolve({ accessToken, refreshToken })
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async getDetailToken(token: string, secretKey: string) {
    try {
      const detail = jwt.verify(token, secretKey) as Payload
      return Promise.resolve(detail)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async createNewAccessToken(refreshToken: string) {
    try {
      const detail = await this.getDetailToken(refreshToken, `${env.REFRESH_TOKEN_SECRET}`)
      const newAccessToken = await this.generateAccessToken(detail.userId, detail.role)
      return Promise.resolve(newAccessToken)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async getRefreshToken(refreshToken: string) {
    try {
      const tokensCollection = await databaseServices.getCollection('tokens')
      const token = await tokensCollection.findOne({ refreshToken: refreshToken })
      return Promise.resolve(token)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async saveRefreshToken(userId: ObjectId, refreshToken: string) {
    try {
      const tokensCollection = await databaseServices.getCollection('tokens')
      await tokensCollection.insertOne({ userId: userId, refreshToken: refreshToken, expireAt: createExpiryTime(env.REFRESH_TOKEN_EXPIRY_TIME) })
      return Promise.resolve(true)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async deleteRefreshToken(refreshToken: string) {
    try {
      const tokensCollection = await databaseServices.getCollection('tokens')
      await tokensCollection.findOneAndDelete({ refreshToken: refreshToken })
      return Promise.resolve(true)
    } catch (error) {
      return Promise.reject(error)
    }
  }

}

const tokenService = new TokenService()
export default tokenService
