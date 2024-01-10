import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { isValidObjectId } from 'mongoose'

import logger from './../../logger'

import * as commentService from './../../services/comment.service'

export const createComment = async (req: Request, res: Response) => {
  logger.info('Called createComment...')
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

    const data = await commentService.createComment(
      content,
      postID,
      tokenUserInfo.userID
    )

    return res.status(StatusCodes.CREATED).json({ data })
  } catch (e) {
    const err = e as Error
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
  }
}
