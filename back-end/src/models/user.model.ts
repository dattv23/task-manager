import { ObjectId } from 'mongodb'
import { User } from '../types'
import { UserRole, UserVerifyStatus } from '../constants/enum'

export default class UserModel {
  _id?: ObjectId
  name: string
  email: string
  password: string
  // date_of_birth: Date
  role: UserRole
  verify: UserVerifyStatus

  constructor(user: User) {
    this.name = user.name
    this.email = user.email
    this.password = user.password
    // this.date_of_birth = new Date(user.date_of_birth)
    this.role = user.role || UserRole.User
    this.verify = user.status || UserVerifyStatus.Unverified
  }
}