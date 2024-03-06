import { formatDate } from 'date-fns'
import { Task, TaskPriority, TaskStatus } from '~/@types/task.type'

export const mockTasks: Task[] = [
  {
    _id: crypto.randomUUID(),
    name: 'Create a Design System for Enum Workspace.',
    description:
      'I am to create a simpe design system to use to teach aspiring UI / UX Designers in my forth-coming cass on the 2nd of october 20201',
    priority: TaskPriority.IMPORTANT,
    dueDate: formatDate(new Date(), 'dd/MM/yyyy'),
    createdAt: formatDate(new Date(), 'dd/MM/yyyy'),
    status: TaskStatus.PENDING
  },
  {
    _id: crypto.randomUUID(),
    name: 'Create a Design System for Enum Workspace.',
    description:
      'I am to create a simpe design system to use to teach aspiring UI / UX Designers in my forth-coming cass on the 2nd of october 20201',
    priority: TaskPriority.IMPORTANT,
    dueDate: formatDate(new Date(), 'dd/MM/yyyy'),
    createdAt: formatDate(new Date(), 'dd/MM/yyyy'),
    status: TaskStatus.COMPLETED
  },
  {
    _id: crypto.randomUUID(),
    name: 'Create a Design System for Enum Workspace.',
    description:
      'I am to create a simpe design system to use to teach aspiring UI / UX Designers in my forth-coming cass on the 2nd of october 20201',
    priority: TaskPriority.IMPORTANT,
    dueDate: formatDate(new Date(), 'dd/MM/yyyy'),
    createdAt: formatDate(new Date(), 'dd/MM/yyyy'),
    status: TaskStatus.PENDING
  },
  {
    _id: crypto.randomUUID(),
    name: 'Create a Design System for Enum Workspace.',
    description:
      'I am to create a simpe design system to use to teach aspiring UI / UX Designers in my forth-coming cass on the 2nd of october 20201',
    priority: TaskPriority.IMPORTANT,
    dueDate: formatDate(new Date(), 'dd/MM/yyyy'),
    createdAt: formatDate(new Date(), 'dd/MM/yyyy'),
    status: TaskStatus.IN_PROGRESS
  },
  {
    _id: crypto.randomUUID(),
    name: 'Create a Design System for Enum Workspace.',
    description:
      'I am to create a simpe design system to use to teach aspiring UI / UX Designers in my forth-coming cass on the 2nd of october 20201',
    priority: TaskPriority.IMPORTANT,
    dueDate: formatDate(new Date(), 'dd/MM/yyyy'),
    createdAt: formatDate(new Date(), 'dd/MM/yyyy'),
    status: TaskStatus.PENDING
  },
  {
    _id: crypto.randomUUID(),
    name: 'Create a Design System for Enum Workspace.',
    description:
      'I am to create a simpe design system to use to teach aspiring UI / UX Designers in my forth-coming cass on the 2nd of october 20201',
    priority: TaskPriority.IMPORTANT,
    dueDate: formatDate(new Date(), 'dd/MM/yyyy'),
    createdAt: formatDate(new Date(), 'dd/MM/yyyy'),
    status: TaskStatus.IN_PROGRESS
  },
  {
    _id: crypto.randomUUID(),
    name: 'Create a Design System for Enum Workspace.',
    description:
      'I am to create a simpe design system to use to teach aspiring UI / UX Designers in my forth-coming cass on the 2nd of october 20201',
    priority: TaskPriority.IMPORTANT,
    dueDate: formatDate(new Date(), 'dd/MM/yyyy'),
    createdAt: formatDate(new Date(), 'dd/MM/yyyy'),
    status: TaskStatus.IN_PROGRESS
  },
  {
    _id: crypto.randomUUID(),
    name: 'Create a Design System for Enum Workspace.',
    description:
      'I am to create a simpe design system to use to teach aspiring UI / UX Designers in my forth-coming cass on the 2nd of october 20201',
    priority: TaskPriority.IMPORTANT,
    dueDate: formatDate(new Date(), 'dd/MM/yyyy'),
    createdAt: formatDate(new Date(), 'dd/MM/yyyy'),
    status: TaskStatus.COMPLETED
  },
  {
    _id: crypto.randomUUID(),
    name: 'Create a Design System for Enum Workspace.',
    description:
      'I am to create a simpe design system to use to teach aspiring UI / UX Designers in my forth-coming cass on the 2nd of october 20201',
    priority: TaskPriority.IMPORTANT,
    dueDate: formatDate(new Date(), 'dd/MM/yyyy'),
    createdAt: formatDate(new Date(), 'dd/MM/yyyy'),
    status: TaskStatus.COMPLETED
  }
]
