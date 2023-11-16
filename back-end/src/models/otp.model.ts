import { OTP } from '../types'

export default class OTPModel {
  email: string
  code: string

  constructor(otp: OTP) {
    this.email = otp.email
    this.code = otp.code
  }
}