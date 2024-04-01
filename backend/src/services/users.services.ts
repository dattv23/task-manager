import { ResultCreateUserType, ResultGetProfileType } from '~/@types/response.types'
import { GetProfileBody, UploadAvatarBody, UserBody } from '~/models/requests/user.request'
import { databaseService } from './database.services'
import { ObjectId } from 'mongodb'
import { ErrorWithStatus } from '~/models/Error'
import { StatusCodes } from 'http-status-codes'
import { RESULT_RESPONSE_MESSAGES } from '~/constants/messages'
import cloudinaryService from './cloudiary.services'
import { User } from '~/models/database'
import tokenServices from './token.services'
import { UserRole } from '~/constants/enums'

class UsersServices {
  async createUser(payload: UserBody): Promise<ResultCreateUserType> {
    const { email } = payload
    const user = await databaseService.users.findOne({ email: email })
    if (user) {
      const [accessToken, refreshToken] = await tokenServices.signAccessAndRefreshToken(user._id.toString(), user.role)
      return { email, fullName: user.fullName, accessToken, refreshToken }
    }
    const newUser = new User({ ...payload, role: UserRole.User })
    const result = await databaseService.users.insertOne(newUser)
    const [accessToken, refreshToken] = await tokenServices.signAccessAndRefreshToken(result.insertedId.toString(), newUser.role)
    return { email, fullName: newUser.fullName, accessToken, refreshToken }
  }
  async getProfile(payload: GetProfileBody): Promise<ResultGetProfileType> {
    const { userId } = payload
    const userResult = await databaseService.users.findOne({ _id: new ObjectId(userId) })
    if (!userResult) {
      throw new ErrorWithStatus({ statusCode: StatusCodes.NOT_FOUND, message: RESULT_RESPONSE_MESSAGES.USERS.USER_NOT_EXIST })
    }
    const { _id, fullName, email, dateOfBirth, avatar, bio } = userResult
    const content: ResultGetProfileType = { userId: _id.toString(), fullName, email, dateOfBirth, avatar, bio }
    return content
  }
  async uploadAvatar(payload: UploadAvatarBody, file: Express.Multer.File) {
    const { userId } = payload
    const user = await databaseService.users.findOne({ _id: new ObjectId(userId) })
    if (!user) {
      throw new ErrorWithStatus({ statusCode: StatusCodes.NOT_FOUND, message: RESULT_RESPONSE_MESSAGES.USERS.USER_NOT_EXIST })
    }
    const { url } = await cloudinaryService.uploadImage('avatar', file.buffer)
    if (user.avatar) {
      await cloudinaryService.deleteImage(user.avatar)
    }
    await databaseService.users.findOneAndUpdate({ _id: new ObjectId(userId) }, { $set: { avatar: url } })
    return { url: url }
  }
}

const usersServices = new UsersServices()
export default usersServices
