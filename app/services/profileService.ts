import { MongoClient, ObjectId, OptionalId } from 'mongodb'

import dbConnection from '../configs/dbConnection.ts'

const DB_NAME = 'blog'
const COLLECTION_NAME = 'profile'

export const getProfile = async () => {
  const client: MongoClient = dbConnection()

  try {
    const db = (await client.connect()).db(DB_NAME)
    const result = await db.collection(COLLECTION_NAME).find().toArray()
    return result[0]
  } finally {
    await client.close()
  }
}

export const getNickname = async () => {
  const client: MongoClient = dbConnection()

  try {
    const db = (await client.connect()).db(DB_NAME)
    const result = await db
      .collection(COLLECTION_NAME)
      .find({}, { projection: { nickname: 1 } })
      .limit(1)
      .toArray()

    return result[0].nickname
  } finally {
    await client.close()
  }
}

export const updateProfile = async (id: string, $set: OptionalId<Document>) => {
  const client: MongoClient = dbConnection()

  try {
    const db = (await client.connect()).db(DB_NAME)
    await db
      .collection(COLLECTION_NAME)
      .updateOne({ _id: new ObjectId(id) }, { $set })
  } finally {
    await client.close()
  }
}
