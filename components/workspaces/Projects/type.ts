import { Models } from "node-appwrite"

export type Projects = Models.Document & {
  name: string
  imageUrl: string
  workspaceId: string
}

export interface TaskAnalyticsTypes {
  taskCount: number
  taskDifference: number
  assignedTaskCount: number
  assignedTaskDifference: number
  incompleteTaskCount: number
  incompleteTaskDifference: number
  completeTaskCount: number
  completeTaskDifference: number
  overdueTaskCount: number
  overdueTaskDifference: number
}
