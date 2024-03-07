import z from 'zod'
import { TaskPriority } from '~/constants/enums'
import { VALIDATION_MESSAGES } from '~/constants/messages'

export const taskSchema = z.object({
  name: z.string({ required_error: VALIDATION_MESSAGES.TASK.NAME_REQUIRED, invalid_type_error: VALIDATION_MESSAGES.TASK.NAME_LENGTH_ERROR }).min(5).max(125),
  description: z.string({ invalid_type_error: VALIDATION_MESSAGES.TASK.DESCRIPTION_LENGTH_ERROR }).min(5).max(255).optional(),
  priority: z.enum([TaskPriority.LESS_IMPORTANT, TaskPriority.IMPORTANT, TaskPriority.VERY_IMPORTANT], {
    required_error: VALIDATION_MESSAGES.TASK.PRIORITY_REQUIRED,
    invalid_type_error: VALIDATION_MESSAGES.TASK.INVALID_PRIORITY
  }),
  dueDate: z.string({ required_error: VALIDATION_MESSAGES.TASK.DUE_DATE_REQUIRED }).datetime({ message: VALIDATION_MESSAGES.TASK.INVALID_DATE })
})
