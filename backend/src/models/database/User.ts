import { ObjectId } from 'mongodb'
import { UserType } from '~/@types/user.types'
import { UserRole, UserVerifyStatus } from '~/constants/enums'

export default class User {
  _id?: ObjectId
  fullName: string
  email: string
  password: string
  date_of_birth: Date
  avatar: string
  bio: string
  isOnline: boolean
  role: UserRole
  verify: UserVerifyStatus
  _destroy: boolean
  created_at: Date
  updated_at: Date

  constructor(user: UserType) {
    this._id = user._id
    this.fullName = user.fullName
    this.email = user.email
    this.password = user.password
    this.date_of_birth = user.date_of_birth || new Date()
    this.avatar = user.avatar || ''
    this.bio = user.bio || ''
    this.isOnline = user.isOnline || false
    this.role = user.role || UserRole.User
    this.verify = user.verify || UserVerifyStatus.Unverified
    this._destroy = user._destroy || false
    this.created_at = user.created_at || new Date()
    this.updated_at = user.updated_at || new Date()
  }
}
