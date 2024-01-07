import Moralis from 'moralis'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import config from './../config'
import logger from './../logger'

import { HASH_SALT, DEFAULT_USER_AVATAR } from './../constants/user.constant'

import * as userRepository from './../repository/user.repository'

import type { AvatarUploadData } from './../types/user.type'

export const getUserByID = async (userID: string) => {
  try {
    const user = await userRepository.getUserByID(userID)
    return user
  } catch (e) {
    const err = e as Error
    logger.error('failed getUserByID')
    logger.error(err.message)
    throw new Error(err.message)
  }
}

export const signUp = async (
  username: string,
  email: string,
  password: string,
  bio: string,
  avatar: AvatarUploadData | null
) => {
  try {
    const usernameExist = await userRepository.getUserByUsername(username)
    const emailExist = await userRepository.getUserByEmail(email)
    if (usernameExist) {
      throw new Error('username already exits')
    }
    if (emailExist) {
      throw new Error('email already exits')
    }

    const newUserData = {
      username,
      email,
      password: '',
      bio,
      avatar: '',
      posts: [],
    }

    newUserData.password = await bcrypt.hash(password, HASH_SALT)

    if (avatar) {
      const avatarPath = `devmind-${Date.now()}-${Math.round(
        Math.random() * 1e9
      )}`
      const avatarData = Buffer.from(avatar.data).toString('base64')

      const imageABI = [
        {
          path: avatarPath,
          content: avatarData,
        },
      ]
      const response = await Moralis.EvmApi.ipfs.uploadFolder({
        abi: imageABI,
      })

      newUserData.avatar = response.result[0].path
    } else {
      newUserData.avatar = DEFAULT_USER_AVATAR
    }

    const newUser = await userRepository.createNewUser(newUserData)

    const authToken = jwt.sign(
      {
        userID: newUser._id,
        email: newUser.email,
      },
      config.JWT_SECRET_KEY,
      { expiresIn: '1d' }
    )

    return { authToken, user: newUser }
  } catch (e) {
    const err = e as Error
    logger.error('failed sign up')
    logger.error(err.message)
    throw new Error(err.message)
  }
}

export const signIn = async (email: string, password: string) => {
  try {
    const user = await userRepository.getUserByEmail(email)
    if (!user) {
      throw new Error('no user found with provided email')
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
      throw new Error('incorrect password')
    }

    const authToken = jwt.sign(
      {
        userID: user._id,
        email: user.email,
      },
      config.JWT_SECRET_KEY,
      { expiresIn: '1d' }
    )

    return { authToken, user }
  } catch (e) {
    const err = e as Error
    logger.error('failed sign in')
    logger.error(err.message)
    throw new Error(err.message)
  }
}
