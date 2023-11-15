import { ObjectId } from 'mongodb'
import { TToken } from '../types/token.type'

export default class Token {
  userId: ObjectId
  token: string

  constructor(token: TToken) {
    this.userId = token.userId
    this.token = token.token
  }
}