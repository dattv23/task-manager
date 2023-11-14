import { ObjectId } from 'mongodb'

export type TToken = {
  userId: ObjectId,
  token: string,
}

