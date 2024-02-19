import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { sendResponse } from '~/config/response.config'
import { RESULT_RESPONSE_MESSAGES } from '~/constants/messages'
import { GetProfileBody, UploadAvatarBody } from '~/models/requests/user.request'
import usersServices from '~/services/users.services'

export const usersController = {
  getProfile: async (req: Request<ParamsDictionary, any, GetProfileBody>, res: Response, next: NextFunction) => {
    const result = await usersServices.getProfile(req.body)
    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.USERS.GET_PROFILE.IS_SUCCESS)
  },
  uploadAvatar: async (req: Request<ParamsDictionary, any, UploadAvatarBody>, res: Response, next: NextFunction) => {
    const result = await usersServices.uploadAvatar(req.body, req.file!)
    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.USERS.UPLOAD_AVATAR.IS_SUCCESS)
  }
}
