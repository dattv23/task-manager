import { ResultRegisterType } from '~/@types/response.types'
import { UserRole } from '~/constants/enums'
import User from '~/models/database/User'
import { RegisterBody } from '~/models/requests/user.requests'
import { hashPassword } from '~/utils/crypto'
import { databaseService } from './database.services'
import tokenServices from './token.services'
import RefreshToken from '~/models/database/RefreshToken'
import { ObjectId } from 'mongodb'
import { ErrorWithStatus } from '~/models/Error'
import { StatusCodes } from 'http-status-codes'

class UserServices {
  async register(payload: RegisterBody): Promise<ResultRegisterType> {
    try {
      const { fullName, email, password } = payload
      const hashedPassword = hashPassword(password)
      const newUser = new User({
        ...payload,
        password: hashedPassword,
        role: UserRole.User
      })
      const userResult = await databaseService.users.insertOne(newUser)
      const user_id = userResult.insertedId.toString()
      const [access_token, refresh_token] = await tokenServices.signAccessAndRefreshToken(user_id, UserRole.User)
      await databaseService.refreshTokens.insertOne(
        new RefreshToken({
          token: refresh_token,
          user_id: new ObjectId(user_id)
        })
      )
      const content: ResultRegisterType = { _id: user_id, fullName, email, access_token, refresh_token }
      return content
    } catch (error) {
      throw new ErrorWithStatus({
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error'
      })
    }
  }
}

const userServices = new UserServices()
export default userServices
