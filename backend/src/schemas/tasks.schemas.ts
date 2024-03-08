import z from 'zod'
import { TaskPriority, TaskStatus } from '~/constants/enums'
import { VALIDATION_MESSAGES } from '~/constants/messages'

export const taskSchema = z.object({
  name: z.string({ required_error: VALIDATION_MESSAGES.TASK.NAME_REQUIRED, invalid_type_error: VALIDATION_MESSAGES.TASK.NAME_LENGTH_ERROR }).min(5).max(125),
  description: z.string({ invalid_type_error: VALIDATION_MESSAGES.TASK.DESCRIPTION_LENGTH_ERROR }).min(5).max(255).optional(),
  priority: z.enum([TaskPriority.LESS_IMPORTANT, TaskPriority.IMPORTANT, TaskPriority.VERY_IMPORTANT], {
    invalid_type_error: VALIDATION_MESSAGES.TASK.INVALID_PRIORITY
  }),
  dueDate: z.string({ required_error: VALIDATION_MESSAGES.TASK.DUE_DATE_REQUIRED }).datetime({ message: VALIDATION_MESSAGES.TASK.INVALID_DATE }),
  status: z
    .enum([TaskStatus.PENDING, TaskStatus.IN_PROGRESS, TaskStatus.COMPLETED], {
      invalid_type_error: VALIDATION_MESSAGES.TASK.INVALID_PRIORITY
    })
    .optional()
})

export const editTaskSchema = z.object({
  name: z.string({ invalid_type_error: VALIDATION_MESSAGES.TASK.NAME_LENGTH_ERROR }).min(5).max(125).optional(),
  description: z.string({ invalid_type_error: VALIDATION_MESSAGES.TASK.DESCRIPTION_LENGTH_ERROR }).min(5).max(255).optional(),
  priority: z
    .enum([TaskPriority.LESS_IMPORTANT, TaskPriority.IMPORTANT, TaskPriority.VERY_IMPORTANT], {
      invalid_type_error: VALIDATION_MESSAGES.TASK.INVALID_PRIORITY
    })
    .optional(),
  dueDate: z.string({ required_error: VALIDATION_MESSAGES.TASK.DUE_DATE_REQUIRED }).datetime({ message: VALIDATION_MESSAGES.TASK.INVALID_DATE }).optional(),
  status: z
    .enum([TaskStatus.PENDING, TaskStatus.IN_PROGRESS, TaskStatus.COMPLETED], {
      invalid_type_error: VALIDATION_MESSAGES.TASK.INVALID_PRIORITY
    })
    .optional(),
  startDate: z.string({ required_error: VALIDATION_MESSAGES.TASK.DUE_DATE_REQUIRED }).datetime({ message: VALIDATION_MESSAGES.TASK.INVALID_DATE }).optional()
})
