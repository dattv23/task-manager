import { env } from '../config/environment'
import hashData from '../utils/hashData'
import createExpirationTime from '../utils/createExpiryTime'
import databaseServices from './database.service'
import { OTP, User } from '../types'
import { UserRole, UserVerifyStatus } from '../constants/enum'
import UserModel from '../models/user.model'

class UserService {
  async getAllUser() {
    try {
      const usersCollection = await databaseServices.getCollection('users')
      const users = await usersCollection.find({}).toArray()
      return Promise.resolve(users)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async getUserByEmail(email: string) {
    try {
      const usersCollection = await databaseServices.getCollection('users')
      const user = await usersCollection.findOne({ email: email })
      return Promise.resolve(user)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async updateUserVerified(email: string) {
    try {
      const usersCollection = await databaseServices.getCollection('users')
      const user = await usersCollection.findOneAndUpdate({ email: email }, { $set: { verify: UserVerifyStatus.Verified } }, { upsert: true })
      return Promise.resolve(user)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async createUser(data: User) {
    try {
      const newUser = new UserModel({ ...data, role: UserRole.User, status: UserVerifyStatus.Unverified })
      const usersCollection = await databaseServices.getCollection('users')
      const userId = (await usersCollection.insertOne(newUser)).insertedId
      return Promise.resolve(userId)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async saveOTP(data: OTP) {
    try {
      const otpsCollection = await databaseServices.getCollection('otps')
      await otpsCollection.insertOne({ email: data.email, code: hashData(data.code), expireAt: createExpirationTime(env.OTP_EXPIRY_TIME) })
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async verifyUser(data: OTP) {
    try {
      const otpsCollection = await databaseServices.getCollection('otps')
      const otp = await otpsCollection.findOne({ email: data.email, code: hashData(data.code) })
      return otp
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async getUserByMailAndPass(email: string, pass: string) {
    try {
      const usersCollection = await databaseServices.getCollection('users')
      const user = usersCollection.findOne({ email: email, password: hashData(pass) })
      return user
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

const userService = new UserService()
export default userService