export type LoginField = {
  email: string
  password: string
}

export type LoginResult = {
  userId: string
  email: string
  fullName: string
  accessToken: string
  refreshToken: string
}
