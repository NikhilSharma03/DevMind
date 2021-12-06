const express = require("express")
const router = express.Router()
// Post controllers
const commentsController = require("./../controllers/comments")
const JWTAuthMiddleware = require("./../middlewares/jwt_auth")

// Method handlers
router.get("/:postID", commentsController.getCommentsByPostID)

router.post("/:postID", JWTAuthMiddleware, commentsController.postCommentByPostID)

router.delete("/:postID/:commentID", JWTAuthMiddleware, commentsController.deleteCommentByCommentID)


module.exports = router