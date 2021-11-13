const express = require("express")
const router = express.Router()
// Post controllers
const commentsController = require("./../controllers/comments")

// Method handlers
router.get("/:postID", commentsController.getCommentsByPostID)


module.exports = router