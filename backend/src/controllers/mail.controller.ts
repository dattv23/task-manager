import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { sendResponse } from '~/config/response.config'
import { MailBody } from '~/models/requests/mail.requests'
import mailServices from '~/services/mail.services'

export const mailController = {
  test: async (req: Request<ParamsDictionary, any, MailBody>, res: Response, next: NextFunction) => {
    const result = await mailServices.send(req.body)
    return sendResponse.success(res, result, 'Success')
  }
}
