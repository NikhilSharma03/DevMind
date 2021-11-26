const express = require("express")
const router = express.Router()
// Post controllers
const postsController = require("./../controllers/posts")
const JWTAuthMiddleware = require("./../middlewares/jwt_auth")
const imageUploadMiddleware = require("./../middlewares/imageUpload")

// Method handlers
router.get("/", postsController.getPosts)
router.get("/:postID", postsController.getPostByPostID)
router.get("/creator/:userID", postsController.getPostByPostID)

router.post("/", JWTAuthMiddleware, imageUploadMiddleware.single("image"), postsController.createPost)

router.patch("/:postID", JWTAuthMiddleware, postsController.updatePostByPostID)

router.delete("/:postID", JWTAuthMiddleware, postsController.deletePostByPostID)


module.exports = router