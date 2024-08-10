import { TaskPriority, TaskStatus } from '~/constants/enum'

export type Task = {
  _id: string
  name: string
  description: string
  priority: TaskPriority
  status: TaskStatus
  startDate: Date
  dueDate: Date
}
