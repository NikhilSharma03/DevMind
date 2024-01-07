import { z } from 'zod'

export const signUpRequestSchema = z.object({
  body: z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    bio: z.string().max(100),
  }),
})

export const signInRequestSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8),
  }),
})
