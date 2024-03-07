import { ObjectId } from 'mongodb'
import { TaskType } from '~/@types/task.type'
import { TaskPriority } from '~/constants/enums'

export default class Task {
  _id?: ObjectId
  userId: ObjectId
  name: string
  description: string
  priority: TaskPriority
  dueDate: Date
  startDate?: Date
  created_at?: Date
  updated_at?: Date
  _destroy?: boolean

  constructor(task: TaskType) {
    this._id = task._id
    this.userId = task.userId
    this.name = task.name
    this.description = task.description || ''
    this.priority = task.priority
    this.startDate = task.startDate || new Date()
    this.dueDate = task.dueDate
    this.created_at = task.created_at || new Date()
    this.updated_at = task.updated_at || new Date()
    this._destroy = task._destroy || false
  }
}
