import { ObjectId } from 'mongodb'
import { UserRole, UserVerifyStatus } from '../constants/enum'
import { User } from '../types'

export class UserModel {
  _id?: ObjectId
  name: string
  email: string
  password: string
  role: UserRole
  status: UserVerifyStatus

  constructor(user: User) {
    this._id = user._id
    this.name = user.name
    this.email = user.email
    this.password = user.password
    this.role = user.role || UserRole.User
    this.status = user.status || UserVerifyStatus.Unverified
  }
}