import { SignOptions } from 'jsonwebtoken'
import { ObjectId } from 'mongodb'
import { TokenType, UserRole } from '~/constants/enums'

export type RefreshTokenType = {
  _id?: ObjectId
  userId: ObjectId
  token: string
  created_at?: Date
  updated_at?: Date
}

export type TokenPayloadType = {
  userId: string
  role: UserRole
  tokenType: TokenType
}

export type SignTokenType = {
  payload: TokenPayloadType
  privateKey: string
  options: SignOptions
}

export type VerifyTokenType = {
  token: string
  privateKey: string
}
