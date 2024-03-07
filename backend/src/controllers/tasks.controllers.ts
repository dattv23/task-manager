import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { sendResponse } from '~/config/response.config'
import { RESULT_RESPONSE_MESSAGES } from '~/constants/messages'
import { CreateTaskPayload, GetTasksPayload } from '~/models/requests/tasks.requests'
import tasksServices from '~/services/tasks.services'

export const tasksController = {
  getTasks: async (req: Request<ParamsDictionary, any, GetTasksPayload>, res: Response, next: NextFunction) => {
    const result = await tasksServices.getTask(req.body)
    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.TASKS.GET_TASKS.IS_SUCCESS)
  },
  createTask: async (req: Request<ParamsDictionary, any, CreateTaskPayload>, res: Response, next: NextFunction) => {
    const result = await tasksServices.createTask(req.body)
    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.TASKS.CREATE_TASK.IS_SUCCESS)
  }
}
