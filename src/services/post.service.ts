import Moralis from 'moralis'

import logger from './../logger'

import * as userRepository from './../repository/user.repository'
import * as postRepository from './../repository/post.repository'

import type { PostImageUploadData } from './../types/post.type'

export const createPost = async (
  content: string,
  userID: string,
  image: PostImageUploadData | null
) => {
  try {
    const user = await userRepository.getUserByID(userID)
    if (!user) {
      throw new Error('cannot find user with provided user id')
    }

    const newPostData = {
      content,
      image: '',
      user: user._id,
      likes: [],
      comments: [],
    }

    if (image) {
      const imagePath = `devmind-${Date.now()}-${Math.round(
        Math.random() * 1e9
      )}`
      const imageData = Buffer.from(image.data).toString('base64')

      const imageABI = [
        {
          path: imagePath,
          content: imageData,
        },
      ]
      const response = await Moralis.EvmApi.ipfs.uploadFolder({
        abi: imageABI,
      })

      newPostData.image = response.result[0].path
    }

    const newPost = await postRepository.createPost(newPostData)

    await userRepository.addPostInUserData(userID, newPost._id)

    return newPost
  } catch (e) {
    const err = e as Error
    logger.info('failed createPost')
    logger.info(err.message)
    throw new Error(err.message)
  }
}

export const getPosts = async () => {
  try {
    const posts = await postRepository.getPosts()
    return posts
  } catch (e) {
    const err = e as Error
    logger.error('failed getPosts')
    logger.error(err.message)
    throw new Error(err.message)
  }
}

export const getPostByID = async (postID: string) => {
  try {
    const post = await postRepository.getPostByID(postID)
    return post
  } catch (e) {
    const err = e as Error
    logger.error('failed getPostByID')
    logger.error(err.message)
    throw new Error(err.message)
  }
}

export const getPostsByUserID = async (userID: string) => {
  try {
    const post = await postRepository.getPostsByUserID(userID)
    return post
  } catch (e) {
    const err = e as Error
    logger.error('failed getPostsByUserID')
    logger.error(err.message)
    throw new Error(err.message)
  }
}

export const updatePostByID = async (
  postID: string,
  content: string,
  userID: string
) => {
  try {
    const post = await postRepository.getPostByID(postID)
    if (!post) {
      throw new Error('post not found with provided id')
    }

    if (post.user._id.toString().toLowerCase() !== userID.toLowerCase()) {
      throw new Error('unauthorized to update post')
    }

    post.content = content

    const updatedPost = await post.save()

    return updatedPost
  } catch (e) {
    const err = e as Error
    logger.error('failed updatePostByID')
    logger.error(err.message)
    throw new Error(err.message)
  }
}

export const deletePostByID = async (postID: string, userID: string) => {
  try {
    const post = await postRepository.getPostByID(postID)
    if (!post) {
      throw new Error('post not found with provided id')
    }

    if (post.user._id.toString().toLowerCase() !== userID.toLowerCase()) {
      throw new Error('unauthorized to update post')
    }

    const deletedPost = await post.deleteOne()

    await userRepository.deletePostFromUserData(userID, postID)

    return deletedPost
  } catch (e) {
    const err = e as Error
    logger.error('failed deletePostByID')
    logger.error(err.message)
    throw new Error(err.message)
  }
}
