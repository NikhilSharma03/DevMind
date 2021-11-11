const Post = require("./../models/posts")

exports.getPosts = async (req,res) => {
    const posts = await Post.find()
    res.json({message:"Found posts successfully", posts})
}

exports.getPostByPostID = async (req,res) => {
    const postID = req.params.postID
    const post = await Post.findPostByPostID(postID)
    
    if (!post){ 
        return res.status(404).json({message:"No post found with provided ID"})
    }

    res.json({message:"Found post successfully", post})
}

exports.getPostsByUserID = async (req,res) => {
    const userID = req.params.userID
    const posts = await Post.findPostByUserID(userID)
    
    if (posts.length === 0){ 
        return res.status(404).json({message:"No post found with provided user ID"})
    }

    res.json({message:"Found posts successfully", posts})
}

exports.createPost = async (req,res) => {
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
        return res.status(500).json({message: error.message})
    }

    res.json({message:"Post Created", post: newPost})
}

exports.updatePostByPostID = async (req,res) => {
    const { content, imageURL, creator } = req.body
    const postID = req.params.postID
    const post = await Post.findPostByPostID(postID)
    if (!post){ 
        return res.status(404).json({message:"No post found with provided ID"})
    }

    post.content = content
    post.imageURL = imageURL
    post.creator = mongoose.mongo.BSONPure.ObjectID.fromHexString(creator)

    try {
        await post.save()
    } catch (error){
        return res.status(500).json({message: error.message})
    }

    res.json({message:"updated post successfully", post})
}

exports.deletePostByPostID = async (req,res) => {
    const postID = req.params.postID
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