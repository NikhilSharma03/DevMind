import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { isValidObjectId } from 'mongoose'

import logger from './../../logger'

import { POST_IMAGE_SIZE_LIMIT } from './../../constants/post.constant'

import * as postService from './../../services/post.service'

import type { PostImageUploadData } from './../../types/post.type'

export const getPostsByUserID = async (req: Request, res: Response) => {
  logger.info('getPostsByUserID called...')
  try {
    const userID = req.params.userID
    if (!isValidObjectId(userID)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'invalid user id' })
    }

    logger.info(`Using ${userID}`)

    const data = await postService.getPostsByUserID(userID)

    return res.status(StatusCodes.OK).json({ data })
  } catch (e) {
    const err = e as Error
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
  }
}

export const getPostByID = async (req: Request, res: Response) => {
  logger.info('getPostByID called...')
  try {
    const postID = req.params.postID
    if (!isValidObjectId(postID)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'invalid post id' })
    }

    logger.info(`Using ${postID}`)

    const data = await postService.getPostByID(postID)

    return res.status(StatusCodes.OK).json({ data })
  } catch (e) {
    const err = e as Error
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
  }
}

export const getPosts = async (_: Request, res: Response) => {
  logger.info('getPosts called...')
  try {
    const data = await postService.getPosts()

    return res.status(StatusCodes.OK).json({ data })
  } catch (e) {
    const err = e as Error
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
  }
}

export const createPost = async (req: Request, res: Response) => {
  logger.info('createPost called...')
  try {
    const { content } = req.body
    const tokenUserInfo = req.userInfo
    if (!tokenUserInfo) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'user info not found in token' })
    }

    const image = req.files ? (req.files.image as PostImageUploadData) : null
    if (image && image.size > POST_IMAGE_SIZE_LIMIT) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'file size is bigger than 10mb' })
    }

    const data = await postService.createPost(
      content,
      tokenUserInfo.userID,
      image
    )

    return res.status(StatusCodes.CREATED).json({ data })
  } catch (e) {
    const err = e as Error
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
  }
}

export const updatePostByID = async (req: Request, res: Response) => {
  logger.info('updatePostByID called...')
  try {
    const { content } = req.body
    const { postID } = req.params
    if (!isValidObjectId(postID)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'invalid post id' })
    }

    const tokenUserInfo = req.userInfo
    if (!tokenUserInfo) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'user info not found in token' })
    }

    logger.info(`Using ${postID}`)

    const data = await postService.updatePostByID(
      postID,
      content,
      tokenUserInfo.userID
    )

    return res.status(StatusCodes.OK).json({ data })
  } catch (e) {
    const err = e as Error
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
  }
}

export const deletePostByID = async (req: Request, res: Response) => {
  logger.info('deletePostByID called...')
  try {
    const { postID } = req.params
    if (!isValidObjectId(postID)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'invalid post id' })
    }

    const tokenUserInfo = req.userInfo
    if (!tokenUserInfo) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'user info not found in token' })
    }

    logger.info(`Using ${postID}`)

    const data = await postService.deletePostByID(postID, tokenUserInfo.userID)

    return res.status(StatusCodes.OK).json({ data })
  } catch (e) {
    const err = e as Error
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
  }
}
