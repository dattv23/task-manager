import { ObjectId } from 'mongodb'
import { ERoles, EVerify, TUser } from '../types/user.type'

export default class User {
  _id?: ObjectId
  name: string
  email: string
  password: string
  dateOfBirth: Date
  roles?: ERoles[] | ERoles.User
  verify?: EVerify | EVerify.Unverified


  constructor({ ...user }: TUser) {
    this.name = user.name
    this.email = user.email
    this.password = user.password
    this.dateOfBirth = new Date(user.dateOfBirth)
    this.roles = ERoles.User
    this.verify = EVerify.Unverified
  }
}