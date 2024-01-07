import { z } from 'zod'

export const createPostRequestSchema = z.object({
  body: z.object({
    content: z.string().trim().min(1),
  }),
})

export const updatePostByIDRequestSchema = z.object({
  body: z.object({
    content: z.string().trim().min(1),
  }),
})
