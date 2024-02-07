export type loginField = {
  email: string
  password: string
}

export type loginResult = {
  userId: string
  email: string
  fullName: string
  accessToken: string
  refreshToken: string
}
