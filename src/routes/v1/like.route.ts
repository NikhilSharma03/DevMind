import { Router } from 'express'

import likesController from './../controllers/likes'
import JWTAuthMiddleware from './../middlewares/jwt_auth'

const likeRouter = Router()

likeRouter.post('/:postID', JWTAuthMiddleware, likesController.postLikeHandler)

export default likeRouter
