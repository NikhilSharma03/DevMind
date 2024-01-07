import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'

import config from './../config'

import type { ParsedAuthTokenData } from './../types/jwt.type'

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers['authorization']
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: 'auth token not found in request header' })
    }

    const token = authHeader.split(' ')[1]

    const tokenData = jwt.verify(
      token,
      config.JWT_SECRET_KEY
    ) as ParsedAuthTokenData

    const currentTime = Math.floor(Date.now() / 1000)

    if (tokenData.exp < currentTime) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'auth token has expired' })
    } else {
      req.userInfo = tokenData
      return next()
    }
  } catch (e) {
    const err = e as Error
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
  }
}

export default verifyToken
