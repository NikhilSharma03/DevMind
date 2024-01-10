import logger from './../logger'

import * as postRepository from './../repository/post.repository'
import * as userRepository from './../repository/user.repository'

export const createComment = async (
  content: string,
  postID: string,
  userID: string
) => {
  try {
    let post = await postRepository.getPostByID(postID)
    if (!post) {
      throw new Error('post not found by provided id')
    }

    const user = await userRepository.getUserByID(userID)
    if (!user) {
      throw new Error('user not found by provided id')
    }

    post = await postRepository.addCommentToPost(content, postID, user._id)

    return post
  } catch (e) {
    const err = e as Error
    logger.info('failed createComment')
    logger.info(err.message)
    throw new Error(err.message)
  }
}
