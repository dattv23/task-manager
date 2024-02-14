export type RegisterField = {
  fullName: string
  email: string
  password: string
}

export type LoginField = {
  email: string
  password: string
}

export type VerificationField = {
  '1': number
  '2': number
  '3': number
  '4': number
  '5': number
  '6': number
}

export type VerifyOTPField = {
  email: string
  code: string
}

export type ResendOTPField = {
  email: string
}
