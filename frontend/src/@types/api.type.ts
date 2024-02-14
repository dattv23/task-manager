export type ErrorValidation = {
  path: string
  message: string
}

export type LoginResult = {
  userId: string
  email: string
  fullName: string
  accessToken: string
  refreshToken: string
}

export type RegisterResult = {
  userId: string
  email: string
  fullName: string
}
