import { ObjectId } from 'mongodb'
import { UserRole } from '../constants/enum'

export type Payload = {
  userId: ObjectId,
  role: UserRole,
}
