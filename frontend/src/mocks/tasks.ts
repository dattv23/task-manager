import { formatDate } from 'date-fns'
import { Task, TaskPriority, TaskStatus } from '~/@types/task.type'

export const mockTasks: Task[] = [
  {
    _id: crypto.randomUUID(),
    name: 'Create a Design System for Enum Workspace.',
    description: '',
    priority: TaskPriority.IMPORTANT,
    dueDate: formatDate(new Date(), 'dd-mm-yyyy'),
    createdAt: formatDate(new Date(), 'dd-mm-yyyy'),
    status: TaskStatus.PENDING
  },
  {
    _id: crypto.randomUUID(),
    name: 'Create a Design System for Enum Workspace.',
    description: '',
    priority: TaskPriority.IMPORTANT,
    dueDate: formatDate(new Date(), 'dd-mm-yyyy'),
    createdAt: formatDate(new Date(), 'dd-mm-yyyy'),
    status: TaskStatus.COMPLETED
  },
  {
    _id: crypto.randomUUID(),
    name: 'Create a Design System for Enum Workspace.',
    description: '',
    priority: TaskPriority.IMPORTANT,
    dueDate: formatDate(new Date(), 'dd-mm-yyyy'),
    createdAt: formatDate(new Date(), 'dd-mm-yyyy'),
    status: TaskStatus.PENDING
  },
  {
    _id: crypto.randomUUID(),
    name: 'Create a Design System for Enum Workspace.',
    description: '',
    priority: TaskPriority.IMPORTANT,
    dueDate: formatDate(new Date(), 'dd-mm-yyyy'),
    createdAt: formatDate(new Date(), 'dd-mm-yyyy'),
    status: TaskStatus.IN_PROGRESS
  },
  {
    _id: crypto.randomUUID(),
    name: 'Create a Design System for Enum Workspace.',
    description: '',
    priority: TaskPriority.IMPORTANT,
    dueDate: formatDate(new Date(), 'dd-mm-yyyy'),
    createdAt: formatDate(new Date(), 'dd-mm-yyyy'),
    status: TaskStatus.PENDING
  },
  {
    _id: crypto.randomUUID(),
    name: 'Create a Design System for Enum Workspace.',
    description: '',
    priority: TaskPriority.IMPORTANT,
    dueDate: formatDate(new Date(), 'dd-mm-yyyy'),
    createdAt: formatDate(new Date(), 'dd-mm-yyyy'),
    status: TaskStatus.IN_PROGRESS
  },
  {
    _id: crypto.randomUUID(),
    name: 'Create a Design System for Enum Workspace.',
    description: '',
    priority: TaskPriority.IMPORTANT,
    dueDate: formatDate(new Date(), 'dd-mm-yyyy'),
    createdAt: formatDate(new Date(), 'dd-mm-yyyy'),
    status: TaskStatus.IN_PROGRESS
  },
  {
    _id: crypto.randomUUID(),
    name: 'Create a Design System for Enum Workspace.',
    description: '',
    priority: TaskPriority.IMPORTANT,
    dueDate: formatDate(new Date(), 'dd-mm-yyyy'),
    createdAt: formatDate(new Date(), 'dd-mm-yyyy'),
    status: TaskStatus.COMPLETED
  },
  {
    _id: crypto.randomUUID(),
    name: 'Create a Design System for Enum Workspace.',
    description: '',
    priority: TaskPriority.IMPORTANT,
    dueDate: formatDate(new Date(), 'dd-mm-yyyy'),
    createdAt: formatDate(new Date(), 'dd-mm-yyyy'),
    status: TaskStatus.COMPLETED
  }
]
