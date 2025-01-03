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

export const deletePost = async (id: string) => {
  const client = dbConnection()

  try {
    const db = client.db(DB_NAME)
    const collection = db.collection(COLLECTION_NAME)
    await collection.deleteOne({ _id: new ObjectId(id) })
  } finally {
    await client.close()
  }
}

export const updatePost = async (id: string, data: PostType) => {
  const client = dbConnection()

  try {
    const db = client.db(DB_NAME)
    const collection = db.collection(COLLECTION_NAME)
    await collection.updateOne({ _id: new ObjectId(id) }, { $set: data })
  } finally {
    await client.close()
  }
}

export const getPrevOrNextPost = async (
  id: string,
  direction: 'prev' | 'next'
) => {
  const client = dbConnection()
  try {
    const db = (await client.connect()).db(DB_NAME)

    // 현재 게시물의 regDate 가져오기
    const currentPost = await db
      .collection(COLLECTION_NAME)
      .findOne({ _id: new ObjectId(id) }, { projection: { regDate: 1 } })

    if (!currentPost) return

    // regDate 기준으로 이전/다음 게시물 찾기
    const result = await db
      .collection(COLLECTION_NAME)
      .find(
        {
          regDate:
            direction === 'prev'
              ? { $lt: currentPost.regDate }
              : { $gt: currentPost.regDate }
        },
        { projection: { _id: 1, title: 1 } }
      )
      .sort({ regDate: direction === 'prev' ? -1 : 1 })
      .limit(1)
      .toArray()

    if (result.length === 0) {
      return
    }

    const { _id, title } = result[0]
    return { _id: _id.toString(), title }
  } finally {
    await client.close()
  }
}
