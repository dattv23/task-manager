import { databaseServices } from './database.service'
import { EVerify, TUser } from '../types/user.type'
import User from '../models/user.model'
import { env } from '../config/environment'
import { ObjectId } from 'mongodb'
import jwt from 'jsonwebtoken'
import { TTokenDetails } from '../types/tokenDetails'
import hashData from '../utils/hashData'

class UserService {
  async getAllUser() {
    try {
      const usersCollection = await databaseServices.getCollection('users')
      const users = (await usersCollection.find({}).toArray()) as User[]
      return users
    } catch (error) {
      // console.log(error)
    }
  }

  async getUserByEmail(email: string) {
    try {
      const usersCollection = await databaseServices.getCollection('users')
      const user = (await usersCollection.findOne({ email: email })) as TUser
      return user
    } catch (error) {
      // console.log(error)
    }
  }

  async updateUserVerified(email: string) {
    try {
      const usersCollection = await databaseServices.getCollection('users')
      const user = await usersCollection.findOneAndUpdate({ email: email }, { $set: { verify: EVerify.Verified } }, { upsert: true })
      return user
    } catch (error) {
      // console.log(error)
    }
  }

  async createUser(data: TUser) {
    try {
      const { name, email, password, dateOfBirth } = data
      const newUser = new User({ name, email, password: hashData(password), dateOfBirth } as TUser)
      const usersCollection = await databaseServices.getCollection('users')
      const userId = (await usersCollection.insertOne(newUser)).insertedId
      return userId
    } catch (error) {
      // console.log(error)
    }
  }

  async saveOTP(email: string, code: string) {
    try {
      const otpsCollection = await databaseServices.getCollection('otps')
      const timeExpire = new Date()
      await otpsCollection.insertOne({ email: email, code: hashData(code), expireAt: new Date(timeExpire.setMinutes(timeExpire.getMinutes() + 5)) })
    } catch (error) {
      // console.log(error)
    }
  }

  async verifyUser(email: string, code: string) {
    try {
      const otpsCollection = await databaseServices.getCollection('otps')
      const otp = await otpsCollection.findOne({ email: email, code: hashData(code) })
      return otp
    } catch (error) {
      // console.log(error)
    }
  }

  async deleteRefreshToken(refreshToken: string) {
    try {
      const tokensCollection = await databaseServices.getCollection('tokens')
      await tokensCollection.findOneAndDelete({ refreshToken: refreshToken })
    } catch (error) {
      // console.log(error)
    }
  }

  async saveRefreshToken(userId: ObjectId, refreshToken: string) {
    try {
      const tokensCollection = await databaseServices.getCollection('tokens')
      const timeExpire = new Date()
      await tokensCollection.insertOne({ userId: userId, refreshToken: refreshToken, expireAt: new Date(timeExpire.setDate(timeExpire.getDate() + 30)) })
    } catch (error) {
      // console.log(error)
    }
  }

  async getRefreshToken(refreshToken: string) {
    try {
      const tokensCollection = await databaseServices.getCollection('tokens')
      const token = await tokensCollection.findOne({ refreshToken: refreshToken })
      return token
    } catch (error) {
      // console.log(error)
    }
  }

  async createNewAccessToken(refreshToken: string) {
    try {
      const tokenDetails = jwt.verify(refreshToken, `${env.REFRESH_TOKEN_SECRET}`) as TTokenDetails
      const payload = { _id: tokenDetails._id, roles: tokenDetails.roles }
      const newAccessToken = jwt.sign(
        payload,
        `${env.ACCESS_TOKEN_SECRET}`,
        { expiresIn: '20m' }
      )
      return newAccessToken
    } catch (error) {
      // console.log(error)
    }
  }

  async getUserByMailAndPass(email: string, pass: string) {
    try {
      const usersCollection = await databaseServices.getCollection('users')
      const user = usersCollection.findOne({ email: email, password: hashData(pass) })
      return user
    } catch (error) {
      // console.log(error)
    }
  }
}

const userService = new UserService()
export { userService }