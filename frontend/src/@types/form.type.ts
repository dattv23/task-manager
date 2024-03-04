import { TaskPriority } from './task.type'

export type RegisterField = {
  fullName: string
  email: string
  password: string
}

export type LoginField = {
  email: string
  password: string
}

export type VerifyOTPField = {
  email: string
  code: string
}

export type ResendOTPField = {
  email: string
}

export type NewPasswordField = {
  email: string
  password: string
}

export type CreateTaskField = {
  name: string
  priority: TaskPriority
  dueDate: Date
  description: string
}
