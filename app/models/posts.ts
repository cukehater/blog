import { ObjectId } from 'mongodb'

export type PostType = {
  _id: ObjectId
  title: string
  description: string
  content: string
  regDate: string
  categories: string[]
}

export type PrevOrNextPostType =
  | {
      _id: string
      title: string
    }
  | undefined
