import { MongoClient, ObjectId, OptionalId } from 'mongodb'

import dbConnection from '../configs/dbConnection.ts'

import processArray from '../utils/processArray.ts'

const DB_NAME = 'blog'
const COLLECTION_NAME = 'posts'

export const getAllPosts = async () => {
  const client: MongoClient = dbConnection()

  try {
    const db = (await client.connect()).db(DB_NAME)
    return await db.collection(COLLECTION_NAME).find().toArray()
  } finally {
    await client.close()
  }
}

export const getPostById = async (id: string) => {
  const client: MongoClient = dbConnection()

  try {
    const db = (await client.connect()).db(DB_NAME)
    return await db
      .collection(COLLECTION_NAME)
      .findOne({ _id: new ObjectId(id) })
  } finally {
    await client.close()
  }
}

export const insertPost = async (formData: OptionalId<Document>) => {
  const client: MongoClient = dbConnection()
  try {
    const db = (await client.connect()).db('blog')
    return await db.collection(COLLECTION_NAME).insertOne(formData)
  } finally {
    await client.close()
  }
}

// TODO: 쿼리 최적화 필요
export const getPostsHashes = async () => {
  const client: MongoClient = dbConnection()

  try {
    const db = (await client.connect()).db(DB_NAME)
    const result = await db
      .collection(COLLECTION_NAME)
      .find({}, { projection: { hashes: 1 } })
      .toArray()

    const a = result.map((item) => [...item.hashes]).flat()

    return processArray(a)
  } finally {
    await client.close()
  }
}

export const getPrevOrNextPost = async (id: string, direction: string) => {
  const client: MongoClient = dbConnection()
  try {
    const db = (await client.connect()).db(DB_NAME)
    const result = await db
      .collection(COLLECTION_NAME)
      .find({
        _id:
          direction === 'prev'
            ? { $lt: new ObjectId(id) }
            : { $gt: new ObjectId(id) }
      })
      .sort({ _id: direction === 'prev' ? -1 : 1 })
      .limit(1)
      .toArray()
    return result
  } finally {
    await client.close()
  }
}

export const updatePost = async (id: string, $set: Record<string, unknown>) => {
  const client: MongoClient = dbConnection()
  try {
    const db = (await client.connect()).db(DB_NAME)
    return await db.collection(COLLECTION_NAME).updateOne(
      {
        _id: new ObjectId(id)
      },
      { $set }
    )
  } finally {
    await client.close()
  }
}

export const deletePost = async (id: string) => {
  const client: MongoClient = dbConnection()
  try {
    const db = (await client.connect()).db(DB_NAME)
    await db.collection(COLLECTION_NAME).deleteOne({
      _id: new ObjectId(id)
    })
  } finally {
    await client.close()
  }
}
