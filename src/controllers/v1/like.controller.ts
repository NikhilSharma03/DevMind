import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { isValidObjectId } from 'mongoose'

import logger from './../../logger'

import * as likeService from './../../services/like.service'

export const likePost = async (req: Request, res: Response) => {
  logger.info('likePost called...')
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

    const data = await likeService.likePost(postID, tokenUserInfo.userID)

    return res.status(StatusCodes.OK).json({ data })
  } catch (e) {
    const err = e as Error
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
  }
}
