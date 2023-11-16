import { ObjectId } from 'mongodb'
import { Token } from '../types'

export default class TokenModel {
  userId: ObjectId
  token: string

  constructor(token: Token) {
    this.userId = token.userId
    this.token = token.token
  }
}