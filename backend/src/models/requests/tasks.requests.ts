import { TaskPriority, TaskStatus } from '~/constants/enums'

export interface GetTasksPayload {
  userId: string
}

export interface CreateTaskPayload {
  userId: string
  name: string
  description: string
  priority: TaskPriority
  dueDate: Date
  status: TaskStatus
}

export interface EditTaskPayload {
  userId: string
  name?: string
  description?: string
  priority?: TaskPriority
  startDate?: Date
  dueDate?: Date
  status?: TaskStatus
}
