import { databaseServices } from './database.service'
import CryptoJS from 'crypto-js'
import { TUser } from '../types/user.type'
import User from '../models/user.model'
import { env } from '../config/environment'

class UserService {
  async getAllUser() {
    const collection = await databaseServices.getCollection('users')
    const users = (await collection.find({}).toArray()) as User[]
    return users
  }

  async getUserByEmaiil(email: string) {
    const collection = await databaseServices.getCollection('users')
    const user = (await collection.findOne({ email: email })) as User
    return user
  }

  async createUser(data: TUser) {
    const { name, email, password, dateOfBirth } = data
    const hashPassword = CryptoJS.HmacSHA256(password, `${env.SECRET_KEY}`).toString()
    const collection = await databaseServices.getCollection('users')
    const newUser = new User({ name, email, password: hashPassword, dateOfBirth })
    const userId = (await collection.insertOne(newUser)).insertedId
    return userId
  }
}

const userService = new UserService()
export { userService }