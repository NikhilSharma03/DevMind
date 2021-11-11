const Post = require("./../models/posts")

exports.getPosts = async (req,res,next) => {
    const posts = await Post.find()
    res.json({message:"Found posts successfully", posts})
}

exports.createPost = async (req,res,next) => {
    const { content, imageURL, creator } = req.body

    const newPost = new Post({
        content,
        imageURL,
        creator,
        comments: []
    })

    try {
        await newPost.save()
    } catch (error){
        return res.json({message: error.message})
    }

    res.json({message:"Post Created", post: newPost})
}