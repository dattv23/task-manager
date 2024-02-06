import { ResultRegisterType } from '~/@types/response.types'
import User from '~/models/database/User'
import { RegisterBody } from '~/models/requests/user.requests'
import { databaseService } from './database.services'
import { hashText } from '~/utils/crypto'
import OTP from '~/models/database/OTP'
import { sendOTP } from '~/utils/email'

class UserServices {
  async register(payload: RegisterBody): Promise<ResultRegisterType> {
    const { fullName, email, password } = payload
    const hashedPassword = hashText(password)
    const newUser = new User({
      ...payload,
      password: hashedPassword
    })
    const userResult = await databaseService.users.insertOne(newUser)
    const otp = await sendOTP(email)
    if (otp) {
      const newOTP = new OTP({
        code: hashText(otp),
        email: email
      })
      await databaseService.otps.insertOne(newOTP)
    }
    const user_id = userResult.insertedId.toString()
    const content: ResultRegisterType = { _id: user_id, fullName, email }
    return content
  }
}

const userServices = new UserServices()
export default userServices
