import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { z } from 'zod'

export const validate =
  (schema: z.AnyZodObject | z.ZodOptional<z.AnyZodObject>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      })
      return next()
    } catch (err) {
      if (err instanceof z.ZodError) {
        err = err.issues.map((e) => ({
          message: `${e.path.join(' ')} ${e.message}`.toLowerCase(),
        }))
      }
      return res.status(StatusCodes.BAD_REQUEST).json({ error: err })
    }
  }
