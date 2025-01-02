import { z } from "zod"

export const createWorkSchema = z.object({
  name: z.string().min(1, "Required"),
})
