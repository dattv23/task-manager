import { TaskPriority } from '~/constants/enums'

export interface GetTasksPayload {
  userId: string
}

export interface CreateTaskPayload {
  userId: string
  name: string
  description: string
  priority: TaskPriority
  dueDate: Date
}
