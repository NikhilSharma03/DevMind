const express = require("express")
const router = express.Router()
// Post controllers
const postsController = require("./../controllers/posts")

// Method handlers
router.get("/", postsController.getPosts)
router.get("/:postID", postsController.getPostByPostID)
router.get("/creator/:userID", postsController.getPostByPostID)

router.post("/", postsController.createPost)

router.patch("/:postID", postsController.updatePostByPostID)

router.delete("/:postID", postsController.deletePostByPostID)


module.exports = router