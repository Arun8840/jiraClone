import { z } from "zod"
import { TaskStatus } from "./types"

export const CreateTaskSchema = z.object({
  name: z.string().trim().min(1, "Name required"),
  description: z.string().optional(),
  workspaceId: z.string().trim().min(1, "WorkspaceId required"),
  projectId: z.string().trim().min(1, "ProjectId required"),
  status: z.nativeEnum(TaskStatus, { required_error: "Status required" }),
  dueDate: z.coerce.date(),
  assigneeId: z.string().trim().min(1, "Required"),
})
