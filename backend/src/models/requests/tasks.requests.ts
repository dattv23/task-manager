import { TaskPriority } from '~/constants/enums'

export interface GetTasksPayload {
  userID: string
}

export interface CreateTaskPayload {
  userID: string
  name: string
  description: string
  priority: TaskPriority
  dueDate: Date
}
