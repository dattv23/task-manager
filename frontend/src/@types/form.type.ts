import { FormItemProps } from 'antd'
import { TaskPriority, TaskStatus } from '~/constants/enum'

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
  startDate: Date
  dueDate: Date
  status: TaskStatus
  description: string
}

export type EditTaskField = {
  id: string
  name: string
  priority: TaskPriority
  startDate: Date
  dueDate: Date
  status: TaskStatus
  description: string
}

export type InputProps = FormItemProps & {
  name: string
  label?: string
  placeholder?: string
  required?: boolean
}
