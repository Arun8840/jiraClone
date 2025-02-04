import { Models } from "node-appwrite"

export enum TaskStatus {
  BACKLOG = "BACKLOG",
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  IN_REVIEW = "IN_REVIEW",
  DONE = "DONE",
}

export enum PriorityStatus {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export type Task = Models.Document & {
  name: string
  status: string
  priority: string
  assigneeId: string
  position: number
  dueDate: string
  projectId: string
  workspaceId: string
  description: string
}
