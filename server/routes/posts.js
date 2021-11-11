const express = require("express")
const router = express.Router()
// Post controllers
const postsController = require("./../controllers/posts")

// Method handlers
router.get("/", postsController.getPosts)



module.exports = router