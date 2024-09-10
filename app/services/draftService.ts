import { MongoClient, ObjectId } from 'mongodb'

import dbConnection from '../configs/dbConnection.ts'

const DB_NAME = 'blog'
const COLLECTION_NAME = 'drafts'

export const getAllDrafts = async () => {
  const client: MongoClient = dbConnection()

  try {
    const db = (await client.connect()).db(DB_NAME)
    return await db.collection(COLLECTION_NAME).find().toArray()
  } finally {
    await client.close()
  }
}

export const getDraftById = async (id: string) => {
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
