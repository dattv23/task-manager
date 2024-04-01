import { ObjectId } from 'mongodb'

export type ResultRegisterType = {
  userId: string
  fullName: string
  email: string
}

export type ResultLoginType = {
  userId: string
  fullName: string
  email: string
  accessToken: string
  refreshToken: string
}

export type ResultNewTokenType = {
  accessToken: string
  refreshToken: string
}

export type ResultGetProfileType = {
  userId: string
  fullName: string
  email: string
  dateOfBirth?: Date
  avatar: string
  bio: string
}

export type ResultCreateUserType = {
  email: string
  fullName: string
  accessToken: string
  refreshToken: string
}
