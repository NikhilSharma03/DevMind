import { Router } from 'express'

import { validate } from './../../middlewares/validate.middleware'

import {
  signUpRequestSchema,
  signInRequestSchema,
} from './../../validations/user.validation'

import {
  getUserByID,
  signUp,
  signIn,
} from './../../controllers/v1/user.controller'

const userRouter = Router()

userRouter.get('/:userID', getUserByID)

userRouter.post('/signup', validate(signUpRequestSchema), signUp)
userRouter.post('/signin', validate(signInRequestSchema), signIn)

export default userRouter
