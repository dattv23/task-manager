import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { sendResponse } from '~/config/response.config'
import { RESULT_RESPONSE_MESSAGES } from '~/constants/messages'
import { CreateTaskPayload, EditTaskPayload, GetTasksPayload } from '~/models/requests/tasks.requests'
import tasksServices from '~/services/tasks.services'

export const tasksController = {
  getTasks: async (req: Request<ParamsDictionary, any, GetTasksPayload>, res: Response, next: NextFunction) => {
    const result = await tasksServices.getTasks(req.body)
    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.TASKS.GET_TASKS.IS_SUCCESS)
  },
  getTaskById: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    const result = await tasksServices.getTaskById(req.params)
    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.TASKS.GET_TASK_BY_ID.IS_SUCCESS)
  },
  createTask: async (req: Request<ParamsDictionary, any, CreateTaskPayload>, res: Response, next: NextFunction) => {
    const result = await tasksServices.createTask(req.body)
    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.TASKS.CREATE_TASK.IS_SUCCESS)
  },
  editTask: async (req: Request<ParamsDictionary, any, EditTaskPayload>, res: Response, next: NextFunction) => {
    const result = await tasksServices.editTask(req.body, req.params)
    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.TASKS.EDIT_TASK.IS_SUCCESS)
  },
  deleteTask: async (req: Request<ParamsDictionary, any, EditTaskPayload>, res: Response, next: NextFunction) => {
    await tasksServices.deleteTask(req.params)
    return sendResponse.success(res, [], RESULT_RESPONSE_MESSAGES.TASKS.DELETE_TASK.IS_SUCCESS)
  }
}
