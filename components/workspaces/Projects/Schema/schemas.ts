import { z } from "zod"

export const createProjectSchema = z.object({
  name: z
    .string()
    .min(1, "Project name is required")
    .max(50, "Project name cannot exceed 50 characters"),
  image: z.union([
    z.instanceof(File),
    z
      .string()
      .transform((value) => (value === "" ? undefined : value))
      .optional(),
  ]),
  workspaceId: z.string(),
})