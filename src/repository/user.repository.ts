import { Types } from 'mongoose'

import logger from './../logger'

import User, { IUser } from './../models/user.model'

export const createNewUser = async (user: IUser) => {
  try {
    const newUser = new User(user)
    await newUser.save()
    return newUser
  } catch (e) {
    const err = e as Error
    logger.error('failed to create new user')
    logger.error(err.message)
    throw new Error('failed to create new user')
  }
}

export const getUserByID = async (userID: string) => {
  try {
    const user = await User.findById(userID)
    return user
  } catch (e) {
    const err = e as Error
    logger.error('failed to get user by id')
    logger.error(err.message)
    throw new Error('failed to get user by id')
  }
}

export const getUserByUsername = async (username: string) => {
  try {
    const user = await User.findOne({ username })
    return user
  } catch (e) {
    const err = e as Error
    logger.error('failed to get user by username')
    logger.error(err.message)
    throw new Error('failed to get user by username')
  }
}

export const getUserByEmail = async (email: string) => {
  try {
    const user = await User.findOne({ email })
    return user
  } catch (e) {
    const err = e as Error
    logger.error('failed to get user by email')
    logger.error(err.message)
    throw new Error('failed to get user by email')
  }
}

export const addPostInUserData = async (
  userID: string,
  postID: Types.ObjectId
) => {
  try {
    const user = await getUserByID(userID)
    if (!user) {
      throw new Error('user not found with provided id')
    }

    user.posts.push(postID)
    await user.save()

    return user
  } catch (e) {
    const err = e as Error
    logger.error('failed to add post in user data')
    logger.error(err.message)
    throw new Error('failed to add post in user data')
  }
}

export const deletePostFromUserData = async (
  userID: string,
  postID: string
) => {
  try {
    const user = await getUserByID(userID)
    if (!user) {
      throw new Error('user not found with provided id')
    }

    user.posts = user.posts.filter(
      (id) => id.toString().toLowerCase() !== postID.toLowerCase()
    )
    await user.save()

    return user
  } catch (e) {
    const err = e as Error
    logger.error('failed to delete post from user data')
    logger.error(err.message)
    throw new Error('failed to delete post from user data')
  }
}
