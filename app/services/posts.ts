import { ObjectId } from 'mongodb'
import { PostType } from '../models/posts'
import dbConnection from '../utils/dbComnnet'

const DB_NAME = 'blog'
const COLLECTION_NAME = 'posts'

export async function getAllPosts() {
  const client = dbConnection()

  try {
    const db = client.db(DB_NAME)
    const collection = db.collection(COLLECTION_NAME)
    const result = await collection.find({}).sort({ regDate: -1 }).toArray()
    return result
  } catch (error) {
    console.error(error)
    return null
  } finally {
    await client.close()
  }
}

export const insertPost = async (formData: PostType) => {
  const client = dbConnection()

  try {
    const db = client.db(DB_NAME)
    const collection = db.collection(COLLECTION_NAME)
    const result = await collection.insertOne(formData)
    return result.insertedId
  } finally {
    await client.close()
  }
}

export const getPostById = async (id: string) => {
  const client = dbConnection()

  try {
    const db = client.db(DB_NAME)
    const collection = db.collection(COLLECTION_NAME)
    const result = await collection.findOne({ _id: new ObjectId(id) })
    return result
  } finally {
    await client.close()
  }
}
