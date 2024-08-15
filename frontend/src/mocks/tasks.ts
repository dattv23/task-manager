import { Task } from '~/@types/task.type'
import { TaskPriority, TaskStatus } from '~/constants/enum'

export const mockTasks: Task[] = [
  {
    _id: crypto.randomUUID(),
    name: 'Create a Design System for Enum Workspace.',
    description:
      'I am to create a simpe design system to use to teach aspiring UI / UX Designers in my forth-coming cass on the 2nd of october 20201',
    priority: TaskPriority.IMPORTANT,
    dueDate: new Date(),
    startDate: new Date(),
    status: TaskStatus.PENDING
  },
  {
    _id: crypto.randomUUID(),
    name: 'Create a Design System for Enum Workspace.',
    description:
      'I am to create a simpe design system to use to teach aspiring UI / UX Designers in my forth-coming cass on the 2nd of october 20201',
    priority: TaskPriority.IMPORTANT,
    dueDate: new Date(),
    startDate: new Date(),
    status: TaskStatus.COMPLETED
  },
  {
    _id: crypto.randomUUID(),
    name: 'Create a Design System for Enum Workspace.',
    description:
      'I am to create a simpe design system to use to teach aspiring UI / UX Designers in my forth-coming cass on the 2nd of october 20201',
    priority: TaskPriority.IMPORTANT,
    dueDate: new Date(),
    startDate: new Date(),
    status: TaskStatus.PENDING
  },
  {
    _id: crypto.randomUUID(),
    name: 'Create a Design System for Enum Workspace.',
    description:
      'I am to create a simpe design system to use to teach aspiring UI / UX Designers in my forth-coming cass on the 2nd of october 20201',
    priority: TaskPriority.IMPORTANT,
    dueDate: new Date(),
    startDate: new Date(),
    status: TaskStatus.IN_PROGRESS
  },
  {
    _id: crypto.randomUUID(),
    name: 'Create a Design System for Enum Workspace.',
    description:
      'I am to create a simpe design system to use to teach aspiring UI / UX Designers in my forth-coming cass on the 2nd of october 20201',
    priority: TaskPriority.IMPORTANT,
    dueDate: new Date(),
    startDate: new Date(),
    status: TaskStatus.PENDING
  },
  {
    _id: crypto.randomUUID(),
    name: 'Create a Design System for Enum Workspace.',
    description:
      'I am to create a simpe design system to use to teach aspiring UI / UX Designers in my forth-coming cass on the 2nd of october 20201',
    priority: TaskPriority.IMPORTANT,
    dueDate: new Date(),
    startDate: new Date(),
    status: TaskStatus.IN_PROGRESS
  },
  {
    _id: crypto.randomUUID(),
    name: 'Create a Design System for Enum Workspace.',
    description:
      'I am to create a simpe design system to use to teach aspiring UI / UX Designers in my forth-coming cass on the 2nd of october 20201',
    priority: TaskPriority.IMPORTANT,
    dueDate: new Date(),
    startDate: new Date(),
    status: TaskStatus.IN_PROGRESS
  },
  {
    _id: crypto.randomUUID(),
    name: 'Create a Design System for Enum Workspace.',
    description:
      'I am to create a simpe design system to use to teach aspiring UI / UX Designers in my forth-coming cass on the 2nd of october 20201',
    priority: TaskPriority.IMPORTANT,
    dueDate: new Date(),
    startDate: new Date(),
    status: TaskStatus.COMPLETED
  },
  {
    _id: crypto.randomUUID(),
    name: 'Create a Design System for Enum Workspace.',
    description:
      'I am to create a simpe design system to use to teach aspiring UI / UX Designers in my forth-coming cass on the 2nd of october 20201',
    priority: TaskPriority.IMPORTANT,
    dueDate: new Date(),
    startDate: new Date(),
    status: TaskStatus.COMPLETED
  }
]
