import { Router } from 'express'

import verifyToken from './../../middlewares/verifyToken.middleware'
import { validate } from './../../middlewares/validate.middleware'

import { createCommentRequestSchema } from './../../validations/comment.validation'

import { createComment } from './../../controllers/v1/comment.controller'

const commentRouter = Router()

commentRouter.post(
  '/:postID',
  verifyToken,
  validate(createCommentRequestSchema),
  createComment
)

export default commentRouter
