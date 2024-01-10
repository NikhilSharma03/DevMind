import { z } from 'zod'

export const createCommentRequestSchema = z.object({
  body: z.object({
    content: z.string().trim().min(1),
  }),
})
