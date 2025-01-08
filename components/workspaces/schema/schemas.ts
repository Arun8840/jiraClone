import { z } from "zod"

export const createWorkSchema = z.object({
  name: z
    .string()
    .min(1, "Workspace name is required")
    .max(50, "Workspace name cannot exceed 50 characters"),
  image: z.union([
    z.instanceof(File),
    z
      .string()
      .transform((value) => (value === "" ? undefined : value))
      .optional(),
  ]),
  description: z.string().trim().optional(),
})

export const updateWorkSchema = z.object({
  name: z
    .string()
    .min(1, "Workspace name is required")
    .max(50, "Workspace name cannot exceed 50 characters")
    .optional(),
  description: z.string().trim().optional(),
  image: z
    .union([
      z.instanceof(File),
      z
        .string()
        .optional()
        .transform((value) => (value === "" ? undefined : value)),
    ])
    .optional(),
})
