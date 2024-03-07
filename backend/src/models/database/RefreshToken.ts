import { ObjectId } from 'mongodb'
import { RefreshTokenType } from '~/@types/token.type'

export default class RefreshToken {
  _id?: ObjectId
  userId: ObjectId
  token: string
  created_at: Date
  updated_at: Date

  constructor(refreshToken: RefreshTokenType) {
    this._id = refreshToken._id
    this.userId = refreshToken.userId
    this.token = refreshToken.token
    this.created_at = refreshToken.created_at || new Date()
    this.updated_at = refreshToken.updated_at || new Date()
  }
}
