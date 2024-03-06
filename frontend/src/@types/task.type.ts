export enum TaskStatus {
  PENDING = 'Pending',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
  IN_REVIEW = 'In Review',
  UNASSIGNED = 'Unassigned'
}

export enum TaskPriority {
  LESS_IMPORTANT = 'Less Important',
  IMPORTANT = 'Important',
  VERY_IMPORTANT = 'Very Important'
}

export type Task = {
  _id: string
  name: string
  description: string
  priority: TaskPriority
  status: TaskStatus
  createdAt: Date | string
  dueDate: Date | string
}
