import { databaseService } from './database.services'
import { ObjectId } from 'mongodb'
import { CreateTaskPayload, EditTaskPayload, GetTasksPayload } from '~/models/requests/tasks.requests'
import { Task } from '~/models/database'
import { TaskType } from '~/@types/task.type'
import { ParamsDictionary } from 'express-serve-static-core'
import { ErrorWithStatus } from '~/models/Error'
import { StatusCodes } from 'http-status-codes'
import { RESULT_RESPONSE_MESSAGES } from '~/constants/messages'

class TasksServices {
  async getTasks(payload: GetTasksPayload): Promise<TaskType[]> {
    const { userId } = payload
    const result = await databaseService.tasks.find({ userId: new ObjectId(userId) })
    const content = (await result.toArray()).filter((item) => item._destroy !== true)
    return content
  }

  async getTaskById(params: ParamsDictionary): Promise<TaskType> {
    const { id } = params
    const task = await databaseService.tasks.findOne({ _id: new ObjectId(id) })
    if (!task || task._destroy === true) {
      throw new ErrorWithStatus({ statusCode: StatusCodes.NOT_FOUND, message: RESULT_RESPONSE_MESSAGES.TASKS.GET_TASK_BY_ID.NOT_FOUND })
    }
    const content: TaskType = task
    return content
  }

  async createTask(payload: CreateTaskPayload): Promise<TaskType> {
    const { userId, name, description, priority, dueDate, status } = payload
    const newTask = new Task({ userId: new ObjectId(userId), name, description, priority, dueDate, status })
    const result = await databaseService.tasks.insertOne(newTask)
    const content: TaskType = { _id: result.insertedId, userId: new ObjectId(userId), name, description, priority, dueDate, status }
    return content
  }

  async editTask(payload: EditTaskPayload, params: ParamsDictionary): Promise<TaskType> {
    const { id } = params
    const { userId, name, description, priority, startDate, dueDate, status } = payload
    const task = await databaseService.tasks.findOne({ _id: new ObjectId(id) })
    if (!task || task._destroy === false) {
      throw new ErrorWithStatus({ statusCode: StatusCodes.NOT_FOUND, message: RESULT_RESPONSE_MESSAGES.TASKS.EDIT_TASK.NOT_FOUND })
    }
    const taskUpdated = {
      name: name ? name : task.name,
      description: description ? description : task.description,
      priority: priority ? priority : task.priority,
      startDate: startDate ? startDate : task.startDate,
      dueDate: dueDate ? dueDate : task.dueDate,
      status: status ? status : task.status
    }
    await databaseService.tasks.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: taskUpdated
      },
      { upsert: true }
    )
    const content: TaskType = { _id: new ObjectId(id), ...taskUpdated, userId: new ObjectId(userId) }
    return content
  }

  async deleteTask(params: ParamsDictionary): Promise<boolean> {
    const { id } = params
    const task = await databaseService.tasks.findOne({ _id: new ObjectId(id) })
    if (!task || task._destroy === false) {
      throw new ErrorWithStatus({ statusCode: StatusCodes.NOT_FOUND, message: RESULT_RESPONSE_MESSAGES.TASKS.DELETE_TASK.NOT_FOUND })
    }
    await databaseService.tasks.updateOne({ _id: new ObjectId(id) }, { $set: { _destroy: true } }, { upsert: true })
    return true
  }
}

const tasksServices = new TasksServices()
export default tasksServices
