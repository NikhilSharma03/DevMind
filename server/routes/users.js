const express = require("express")
const router = express.Router()
// Post controllers
const usersController = require("./../controllers/users")
const JWTAuthMiddleware = require("./../middlewares/jwt_auth")
const imageUploadMiddleware = require("./../middlewares/imageUpload")

// Method handlers
router.get("/:userID", usersController.getUserByID)

router.post("/signup", imageUploadMiddleware.single("profile"),usersController.signUp)
router.post("/login", usersController.login)

router.patch("/:userID", JWTAuthMiddleware, usersController.updateUserByID)

router.delete("/:userID", JWTAuthMiddleware, usersController.deleteUserByID)


module.exports = router