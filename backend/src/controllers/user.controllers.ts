import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { sendResponse } from '~/config/response.config'
import { RESULT_RESPONSE_MESSAGES } from '~/constants/messages'
import { RegisterBody } from '~/models/requests/user.requests'
import userServices from '~/services/user.services'

export const userController = {
  register: async (req: Request<ParamsDictionary, any, RegisterBody>, res: Response, next: NextFunction) => {
    const result = await userServices.register(req.body)
    return sendResponse.created(res, result, RESULT_RESPONSE_MESSAGES.USER.REGISTER)
  }
}
