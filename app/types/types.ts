import { ObjectId } from 'mongodb'

export interface ListItemType {
  _id?: ObjectId | string
  title: string
  description: string
  content: string
  registerDate: string
  hashes: string[]
}

export interface ProfileData {
  profileImage: string
  blogTitle: string
  nickname: string
  introduction: string
  email: string
  portfolioUrl: string
  githubUrl: string
  resumeUrl: string
}
