import { ObjectId } from 'mongodb'

export enum ERoles {
  User = 'USER',
  Admin = 'ADMIN'
}

export enum EVerify {
  Verified = 'VERIFIED',
  Unverified = 'UNVERIFIED',
  Ban = 'BAN'
}

export type TUser = {
  _id?: ObjectId,
  name: string,
  email: string,
  password: string,
  dateOfBirth: Date,
  roles?: ERoles[] | ERoles.User,
  verify?: EVerify | EVerify.Unverified
}

