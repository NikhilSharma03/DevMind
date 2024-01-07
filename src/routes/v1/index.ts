import { Router } from 'express'

import userRouter from './user.route'
import postRouter from './post.route'
import likeRouter from './like.route'
import commentRouter from './comment.route'

const v1Router = Router()

v1Router.use('/user', userRouter)
v1Router.use('/post', postRouter)
v1Router.use('/like', likeRouter)
// v1Router.use('/comment', commentRouter)

export default v1Router
