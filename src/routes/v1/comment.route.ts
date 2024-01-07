import { Router } from 'express'

import commentsController from './../controllers/comments'
import JWTAuthMiddleware from './../middlewares/jwt_auth'

const commentRouter = Router()

commentRouter.get('/:postID', commentsController.getCommentsByPostID)

commentRouter.post(
  '/:postID',
  JWTAuthMiddleware,
  commentsController.postCommentByPostID
)

commentRouter.delete(
  '/:postID/:commentID',
  JWTAuthMiddleware,
  commentsController.deleteCommentByCommentID
)

export default commentRouter
