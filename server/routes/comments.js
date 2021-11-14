const express = require("express")
const router = express.Router()
// Post controllers
const commentsController = require("./../controllers/comments")

// Method handlers
router.get("/:postID", commentsController.getCommentsByPostID)

router.post("/:postID", commentsController.postCommentByPostID)

router.patch("/:postID/:commentID", commentsController.updateCommentByCommentID)

router.delete("/:postID/:commentID", commentsController.deleteCommentByCommentID)


module.exports = router