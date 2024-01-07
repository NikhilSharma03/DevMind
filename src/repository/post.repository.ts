import logger from './../logger'

import Post, { IPost } from './../models/post.model'

export const createPost = async (post: IPost) => {
  try {
    const newPost = new Post(post)
    await newPost.save()
    return newPost
  } catch (e) {
    const err = e as Error
    logger.error('failed to create new post')
    logger.error(err.message)
    throw new Error('failed to create new post')
  }
}

export const getPosts = async () => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate('user', '_id username avatar')

    return posts
  } catch (e) {
    const err = e as Error
    logger.error('failed to get posts')
    logger.error(err.message)
    throw new Error('failed to get posts')
  }
}

export const getPostByID = async (postID: string) => {
  try {
    const post = await Post.findById(postID).populate(
      'user',
      '_id username avatar'
    )

    return post
  } catch (e) {
    const err = e as Error
    logger.error('failed to get post by id')
    logger.error(err.message)
    throw new Error('failed to get post by id')
  }
}

export const getPostsByUserID = async (userID: string) => {
  try {
    const posts = await Post.find({ user: userID })
      .sort({ createdAt: -1 })
      .populate('user', '_id username avatar')

    return posts
  } catch (e) {
    const err = e as Error
    logger.error('failed to get posts by user id')
    logger.error(err.message)
    throw new Error('failed to get posts by user id')
  }
}
