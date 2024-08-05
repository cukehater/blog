import { ObjectId } from 'mongodb'

export interface listItemType {
  _id?: ObjectId
  title: string
  description: string
  content: string
  registerDate: string
  hashes: string[]
}
