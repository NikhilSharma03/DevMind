import { Schema, model, Types } from 'mongoose'

export interface IPost {
  content: string
  image: string
  user: Types.ObjectId
  likes: {
    user: Types.ObjectId
    createdAt: Date
  }[]
  comments: {
    content: string
    user: Types.ObjectId
    createdAt: Date
  }[]
}

const postSchema = new Schema<IPost>(
  {
    content: { type: String, required: true },
    image: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    likes: [
      {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        createdAt: { type: Date, default: Date.now() },
      },
    ],
    comments: [
      {
        content: { type: String, required: true },
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        createdAt: { type: Date, default: Date.now() },
      },
    ],
  },
  {
    timestamps: true,
  }
)

const Post = model<IPost>('Post', postSchema)

export default Post
