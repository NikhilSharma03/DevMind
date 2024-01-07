import { Router } from 'express'

import verifyToken from './../../middlewares/verifyToken.middleware'
import { validate } from './../../middlewares/validate.middleware'

import {
  createPostRequestSchema,
  updatePostByIDRequestSchema,
} from './../../validations/post.validation'

import {
  getPostsByUserID,
  getPostByID,
  getPosts,
  createPost,
  updatePostByID,
  deletePostByID,
} from './../../controllers/v1/post.controller'

const postRouter = Router()

postRouter.get('/user/:userID', getPostsByUserID)
postRouter.get('/:postID', getPostByID)
postRouter.get('/', getPosts)

postRouter.post('/', verifyToken, validate(createPostRequestSchema), createPost)

postRouter.patch(
  '/:postID',
  verifyToken,
  validate(updatePostByIDRequestSchema),
  updatePostByID
)

postRouter.delete('/:postID', verifyToken, deletePostByID)

export default postRouter
