import { databaseService } from './database.services'
import { ObjectId } from 'mongodb'
import { CreateTaskPayload, GetTasksPayload } from '~/models/requests/tasks.requests'
import { Task } from '~/models/database'
import { TaskType } from '~/@types/task.type'

class TasksServices {
  async getTask(payload: GetTasksPayload): Promise<TaskType[]> {
    const { userId } = payload
    const result = await databaseService.tasks.find({ userId: new ObjectId(userId) })
    const content = result.toArray()
    return content
  }

  async createTask(payload: CreateTaskPayload): Promise<TaskType> {
    const { userId, name, description, priority, dueDate, status } = payload
    const newTask = new Task({ userId: new ObjectId(userId), name, description, priority, dueDate, status })
    const result = await databaseService.tasks.insertOne(newTask)
    const content: TaskType = { _id: result.insertedId, userId: new ObjectId(userId), name, description, priority, dueDate, status }
    return content
  }
}

const tasksServices = new TasksServices()
export default tasksServices
