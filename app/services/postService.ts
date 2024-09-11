import { MongoClient, ObjectId, OptionalId } from 'mongodb'

import dbConnection from '../configs/dbConnection.ts'

import countStringOccurrences from '../utils/countStringOccurrences.ts'

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
    const db = (await client.connect()).db(DB_NAME)
    return await db.collection(COLLECTION_NAME).insertOne(formData)
  } finally {
    await client.close()
  }
}

export const getPostsHashes = async () => {
  const client: MongoClient = dbConnection()

  try {
    const db = (await client.connect()).db(DB_NAME)
    const result = await db
      .collection(COLLECTION_NAME)
      .find({}, { projection: { hashes: 1 } })
      .toArray()

    const flatArray = result.map((item) => [...item.hashes]).flat()

    return countStringOccurrences(flatArray)
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

export const getPostsByHash = async (hash: string) => {
  const client: MongoClient = dbConnection()
  try {
    const db = (await client.connect()).db(DB_NAME)
    return await db.collection(COLLECTION_NAME).find({ hashes: hash }).toArray()
  } finally {
    await client.close()
  }
}
