import { z } from "zod"

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().trim().min(1, "Required"),
})

export const RegisterSchema = z.object({
  name: z.string().min(1, "Required"),
  email: z.string().trim().min(1, "Required").email(),
  password: z.string().trim().min(1, "Required"),
})
