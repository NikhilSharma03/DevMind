const Post = require("./../models/posts");
const User = require("./../models/users");
const { isValidObjectId } = require("mongoose");
const { jwtVerification } = require("./../handlers/jwtVerify");

exports.getCommentsByPostID = async (req, res) => {
  const postID = req.params.postID;
  let isObjectID = isValidObjectId(postID);
  if (!isObjectID) {
    return res.status(404).json({ message: "the provided id is invalid" });
  }
  const post = await Post.findById(postID).populate(
    "comments.creator",
    "username email",
  );
  if (!post) {
    return res.status(404).json({ message: "No post found" });
  }

  res.status(200).json({ comments: post });
};

exports.postCommentByPostID = async (req, res) => {
  const postID = req.params.postID;
  let isObjectID = isValidObjectId(postID);
  if (!isObjectID) {
    return res.status(404).json({ message: "the provided id is invalid" });
  }
  const post = await Post.findById(postID).populate(
    "creator comments.creator",
    "username email _id",
  );

  if (!post) {
    return res.status(404).json({ message: "No post found" });
  }
  const { content, creator } = req.body;
  const user = await User.findById(creator);

  // JWT Verification
  let isUserVerified = jwtVerification(
    req,
    res,
    user.email,
    user._id.toString(),
  );
  if (!isUserVerified) {
    return res.status(403).json({ message: "Unauthorized User" });
  }

  const newComment = {
    content,
    creator: user,
  };

  post.comments.push(newComment);

  try {
    await post.save();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.json({ post });
};

exports.deleteCommentByCommentID = async (req, res) => {
  let postID = req.params.postID,
    commentID = req.params.commentID;
  let isObjectID = isValidObjectId(postID);
  if (!isObjectID) {
    return res.status(404).json({ message: "the provided id is invalid" });
  }
  isObjectID = isValidObjectId(commentID);
  if (!isObjectID) {
    return res.status(404).json({ message: "the provided id is invalid" });
  }

  const post = await Post.findById(postID).populate(
    "creator comments.creator",
    "username email _id",
  );
  if (!post) {
    return res.status(404).json({ message: "No post found" });
  }

  const comment = post.comments.find(
    (item) => item._id.toString() === commentID,
  );
  if (!comment) {
    return res.status(404).json({ message: "No comment found" });
  }

  // JWT Verification
  let isUserVerified = jwtVerification(
    req,
    res,
    comment.creator.email,
    comment.creator._id.toString(),
  );
  if (!isUserVerified) {
    return res.status(403).json({ message: "Unauthorized User" });
  }
  post.comments = post.comments.filter(
    (item) => item._id.toString() !== commentID,
  );
  try {
    await post.save();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  const comments = await Post.findById(postID).populate(
    "creator comments.creator",
    "username email _id",
  );

  res
    .status(200)
    .json({
      message: "Comment Deleted Successfully",
      comments: comments.comments,
    });
};
