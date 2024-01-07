import { Schema, model, Types } from 'mongoose'

export interface IUser {
  username: string
  email: string
  password: string
  bio: string
  avatar: string
  posts: Types.ObjectId[]
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 8 },
    bio: { type: String, required: true, maxlength: 100 },
    avatar: { type: String, required: true },
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  },
  {
    timestamps: true,
  }
)

const User = model<IUser>('User', userSchema)

export default User
