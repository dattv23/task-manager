import { ObjectId } from 'mongodb'
import { UserRole, UserVerifyStatus } from '../constants/enum'

export type User = {
  _id?: ObjectId,
  name: string,
  email: string,
  password: string,
  role?: UserRole,
  status?: UserVerifyStatus
}

