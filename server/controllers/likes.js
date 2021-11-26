const Post = require("./../models/posts")
const User = require("./../models/users")
const { isValidObjectId } = require("mongoose")
const { jwtVerification } = require("./../handlers/jwtVerify")

exports.postLikeHandler = async (req, res) => {
    const { userID } = req.body
    let isObjectID = isValidObjectId(userID)
    if (!isObjectID) {
        return res.status(404).json({message:"the provided id is invalid"})
    }

    const user = await User.findById(userID)
    if(!user){
        return res.status(404).json({message: "No user found"})
    }

    // JWT Verification
    let isUserVerified = jwtVerification(req, res, user.email, userID)
    if(!isUserVerified) {
        return res.status(403).json({message: "Unauthorized User"})  
    }

    isObjectID = isValidObjectId(req.params.postID)
    if (!isObjectID) {
        return res.status(404).json({message:"the provided id is invalid"})
    }
    const post = await Post.findById(req.params.postID)
    if(!post) {
        return res.status(404).json({message: "No post found"})
    }

    let isAlreadyLiked = post.likes.find(item => item.creator === user._id)
    if(!isAlreadyLiked){
        // In case of not liked
        post.likes.push(user)

        try{
            await post.save()
        } catch (err) {
            return res.status(403).json({message: err.message}) 
        }

    } else {
        // In case of already liked
        post.likes = post.likes.filter(item => item.creator !== user._id)
        try{
            await post.save()
        } catch (err) {
            return res.status(403).json({message: err.message}) 
        }
    }

    res.status(200).json({message: "success"})

}