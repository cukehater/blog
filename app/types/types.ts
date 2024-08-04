import { ObjectId } from 'mongodb'

export interface listItemType {
  _id: ObjectId
  title: string
  description: string
  date: string
  hashes: string[]
}
