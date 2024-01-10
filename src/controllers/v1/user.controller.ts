import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { isValidObjectId } from 'mongoose'

import logger from './../../logger'

import { AVATAR_SIZE_LIMIT } from './../../constants/user.constant'

import * as userService from './../../services/user.service'

import type { AvatarUploadData } from './../../types/user.type'

export const getUserByID = async (req: Request, res: Response) => {
  logger.info('getUserByID called...')
  try {
    const userID = req.params.userID
    if (!isValidObjectId(userID)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'invalid user id' })
    }

    logger.info(`Using ${userID}`)

    const data = await userService.getUserByID(userID)

    return res.status(StatusCodes.OK).json({ data })
  } catch (e) {
    const err = e as Error
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
  }
}

export const signUp = async (req: Request, res: Response) => {
  logger.info('Sign up called...')
  try {
    const { username, email, password, bio } = req.body
    const avatar = req.files ? (req.files.avatar as AvatarUploadData) : null
    if (avatar && avatar.size > AVATAR_SIZE_LIMIT) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'file size is bigger than 5mb' })
    }

    const data = await userService.signUp(
      username.toLowerCase(),
      email.toLowerCase(),
      password,
      bio,
      avatar
    )

    return res.status(StatusCodes.CREATED).json({ data })
  } catch (e) {
    const err = e as Error
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
  }
}

export const signIn = async (req: Request, res: Response) => {
  logger.info('Sign in called...')
  try {
    const { email, password } = req.body

    const data = await userService.signIn(email.toLowerCase(), password)

    return res.status(StatusCodes.OK).json({ data })
  } catch (e) {
    const err = e as Error
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
  }
}
