import { ObjectId } from 'mongodb'
import { OTPType } from '~/@types/otp.type'

export default class {
  _id?: ObjectId
  email: string
  code: string
  created_at?: Date

  constructor(otp: OTPType) {
    this._id = otp._id
    this.email = otp.email
    this.code = otp.code
    this.created_at = new Date()
  }
}
