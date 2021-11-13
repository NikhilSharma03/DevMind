const Post = require("./../models/posts")
const User = require("./../models/users")
const mongoose = require("mongoose")

exports.getPosts = async (req,res) => {
    const posts = await Post.find().populate("creator","email username")
    res.json({message:"Found posts successfully", posts})
}

exports.getPostByPostID = async (req,res) => {
    const postID = req.params.postID
    let isObjectID = mongoose.isValidObjectId(postID)
    if (!isObjectID) {
        return res.status(404).json({message:"the provided id is invalid"})
    }

    let post = await Post.findPostByPostID(postID)
    
    if (!post){ 
        return res.status(404).json({message:"No post found with provided ID"})
    }
    post = await post.populate("creator","email username")

    res.json({message:"Found post successfully", post})
}

exports.getPostsByUserID = async (req,res) => {
    const userID = req.params.userID
    const posts = await Post.findPostByUserID(userID).populate("creator")
    
    if (posts.length === 0){ 
        return res.status(404).json({message:"No post found with provided user ID"})
    }

    res.json({message:"Found posts successfully", posts})
}

exports.createPost = async (req,res) => {
    const { content, imageURL, creator } = req.body

    let isObjectID = mongoose.isValidObjectId(creator)
    if (!isObjectID) {
        return res.status(404).json({message:"the provided id is invalid"})
    }

    const user = await User.findById(creator)
    if (!user) {
        return res.status(404).json({message:"No user exists with provided id!"})
    }

    const newPost = new Post({
        content,
        imageURL,
        creator: user,
        comments: []
    })

    try {
        await newPost.save()
        user.posts.push(newPost)
        await user.save()
    } catch (error){
        return res.status(500).json({message: error.message})
    }

    const creatorInfo = {username : newPost.creator.username, email : newPost.creator.email }
    
    newPost.creator =  creatorInfo

    res.json({message:"Post Created", post: newPost})
}

exports.updatePostByPostID = async (req,res) => {
    const { content, imageURL } = req.body
    const postID = req.params.postID
    let isObjectID = mongoose.isValidObjectId(postID)
    if (!isObjectID) {
        return res.status(404).json({message:"the provided id is invalid"})
    }

    const post = await Post.findPostByPostID(postID)
    if (!post){ 
        return res.status(404).json({message:"No post found with provided ID"})
    }

    post.content = content
    post.imageURL = imageURL

    try {
        await post.save()
    } catch (error){
        return res.status(500).json({message: error.message})
    }

    res.json({message:"updated post successfully", post})
}

exports.deletePostByPostID = async (req,res) => {
    const postID = req.params.postID
    let isObjectID = mongoose.isValidObjectId(postID)
    if (!isObjectID) {
        return res.status(404).json({message:"the provided id is invalid"})
    }

    const post = await Post.findPostByPostID(postID)
    
    if (!post){ 
        return res.status(404).json({message:"No post found with provided ID"})
    }

    try{
        await post.remove()
    } catch (err) {
        return res.status(500).json({message: "Something went wrong", error: err.message})
    }
    
    res.json({message:"Post deleted successfully", postID})
}