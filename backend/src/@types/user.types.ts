import { ObjectId } from 'mongodb'
import { UserRole, UserVerifyStatus } from '~/constants/enums'

export type UserType = {
  _id?: ObjectId
  fullName: string
  email: string
  password: string
  dateOfBirth?: Date
  avatar?: string
  bio?: string
  isOnline?: boolean
  role?: UserRole
  verify?: UserVerifyStatus
  _destroy?: boolean
  created_at?: Date
  updated_at?: Date
}
