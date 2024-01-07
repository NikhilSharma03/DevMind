import { Router } from 'express'

import verifyToken from './../../middlewares/verifyToken.middleware'

import { likePost } from './../../controllers/v1/like.controller'

const likeRouter = Router()

likeRouter.post('/:postID', verifyToken, likePost)

export default likeRouter
