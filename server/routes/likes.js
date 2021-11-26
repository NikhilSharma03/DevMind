const express = require("express")
const router = express.Router()
// Likes controllers
const likesController = require("./../controllers/likes")
const JWTAuthMiddleware = require("./../middlewares/jwt_auth")

// Method handlers
router.post("/:postID", JWTAuthMiddleware, likesController.postLikeHandler)

module.exports = router