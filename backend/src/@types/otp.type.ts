import { ObjectId } from 'mongodb'

export type OTPType = {
  _id?: ObjectId
  email: string
  code: string
  created_at?: Date
}
