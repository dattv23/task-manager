import { ObjectId } from 'mongodb'
import { ERoles } from './user.type'

export type TTokenDetails = {
  _id: ObjectId,
  roles: ERoles[],
}

