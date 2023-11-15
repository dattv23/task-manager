import { TOtp } from '../types/otp.type'

export default class Otp {
  email: string
  code: string

  constructor(otp: TOtp) {
    this.email = otp.email
    this.code = otp.code
  }
}