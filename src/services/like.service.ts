import logger from './../logger'

import * as postRepository from './../repository/post.repository'
import * as userRepository from './../repository/user.repository'

export const likePost = async (postID: string, userID: string) => {
  try {
    let post = await postRepository.getPostByID(postID)
    if (!post) {
      throw new Error('post not found by provided id')
    }

    const user = await userRepository.getUserByID(userID)
    if (!user) {
      throw new Error('user not found by provided id')
    }

    const alreadyLiked = post.likes.some(({ user }) => {
      return user._id.toString().toLowerCase() === userID.toLowerCase()
    })

    if (alreadyLiked) {
      post = await postRepository.removeLikeFromPost(postID, userID)
    } else {
      post = await postRepository.addLikeToPost(postID, user._id)
    }

    return post
  } catch (e) {
    const err = e as Error
    logger.info('failed likePost')
    logger.info(err.message)
    throw new Error(err.message)
  }
}
