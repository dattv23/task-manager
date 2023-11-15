import { databaseServices } from './database.service'
import CryptoJS from 'crypto-js'
import { EVerify, TUser } from '../types/user.type'
import User from '../models/user.model'
import { env } from '../config/environment'
import { ObjectId } from 'mongodb'
import jwt from 'jsonwebtoken'
import { TTokenDetails } from '../types/tokenDetails'

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
      // const user = await usersCollection.findOneAndUpdate({ email: email }, { verify: EVerify.Verified }) as TUser
      return user
    } catch (error) {
      // console.log(error)
    }
  }

  async createUser(data: TUser) {
    try {
      const { name, email, password, dateOfBirth } = data
      const hashPassword = CryptoJS.HmacSHA256(password, `${env.SECRET_KEY}`).toString()
      const newUser = new User({ name, email, password: hashPassword, dateOfBirth } as TUser)
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
      const hashCode = CryptoJS.HmacSHA256(code, `${env.SECRET_KEY}`).toString()
      await otpsCollection.insertOne({ email: email, code: hashCode, expireAt: new Date(timeExpire.setMinutes(timeExpire.getMinutes() + 5)) })
    } catch (error) {
      // console.log(error)
    }
  }

  async verifyUser(email: string, code: string) {
    try {
      const otpsCollection = await databaseServices.getCollection('otps')
      const hashCode = CryptoJS.HmacSHA256(code, `${env.SECRET_KEY}`).toString()
      const otp = await otpsCollection.findOne({ email: email, code: hashCode })
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
      const hashPass = CryptoJS.HmacSHA256(pass, `${env.SECRET_KEY}`).toString()
      const user = usersCollection.findOne({ email: email, password: hashPass })
      return user
    } catch (error) {
      // console.log(error)
    }
  }
}

const userService = new UserService()
export { userService }