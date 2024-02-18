import { ResultGetProfileType } from '~/@types/response.types'
import { env } from '~/config/env.config'
import { GetProfileBody } from '~/models/requests/user.request'
import { databaseService } from './database.services'
import { ObjectId } from 'mongodb'
import { ErrorWithStatus } from '~/models/Error'
import { StatusCodes } from 'http-status-codes'
import { RESULT_RESPONSE_MESSAGES } from '~/constants/messages'

class UsersServices {
  async getProfile(payload: GetProfileBody): Promise<ResultGetProfileType> {
    const { userID } = payload
    const userResult = await databaseService.users.findOne({ _id: new ObjectId(userID) })
    if (!userResult) {
      throw new ErrorWithStatus({ statusCode: StatusCodes.NOT_FOUND, message: RESULT_RESPONSE_MESSAGES.USERS.USER_NOT_EXIST })
    }
    const { _id, fullName, email, dateOfBirth, avatar, bio } = userResult
    const content: ResultGetProfileType = { userId: _id.toString(), fullName, email, dateOfBirth, avatar, bio }
    return content
  }
}

const usersServices = new UsersServices()
export default usersServices
