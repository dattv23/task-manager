import { ObjectId } from 'mongodb'

export type Token = {
  userId: ObjectId,
  token: string,
}

