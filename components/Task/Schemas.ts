import { z } from "zod"
import { PriorityStatus, TaskStatus } from "./types"

export const CreateTaskSchema = z.object({
  name: z.string().trim().min(1, "Name required"),
  description: z.string().optional(),
  workspaceId: z.string().trim().min(1, "WorkspaceId required"),
  projectId: z.string().trim().min(1, "ProjectId required"),
  status: z.nativeEnum(TaskStatus, { required_error: "Status required" }),
  priority: z.nativeEnum(PriorityStatus, {
    required_error: "Priority required",
  }),
  dueDate: z.coerce.date(),
  assigneeId: z.string().trim().min(1, "Required"),
})

export const UpdateTaskSchema = z.object({
  name: z.string().min(1, "Name required").optional(),
  description: z.string().optional(),
  workspaceId: z.string().min(1, "WorkspaceId required"),
  projectId: z.string().min(1, "ProjectId required"),
  status: z
    .nativeEnum(TaskStatus, { required_error: "Status required" })
    .optional(),
  priority: z
    .nativeEnum(PriorityStatus, {
      required_error: "Priority required",
    })
    .optional(),
  dueDate: z.coerce.date().optional(),
  assigneeId: z.string().min(1, "Required"),
})
