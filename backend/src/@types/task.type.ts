import { ObjectId } from 'mongodb'
import { TaskPriority, TaskStatus } from '~/constants/enums'

export type TaskType = {
  _id?: ObjectId
  userId: ObjectId
  name: string
  description?: string
  priority: TaskPriority
  dueDate: Date
  status?: TaskStatus
  startDate?: Date
  created_at?: Date
  updated_at?: Date
  _destroy?: boolean
}
