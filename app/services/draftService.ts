import { MongoClient, ObjectId, OptionalId } from 'mongodb'

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

export const insertDraft = async (formData: OptionalId<Document>) => {
  const client: MongoClient = dbConnection()

  try {
    const db = (await client.connect()).db(DB_NAME)
    const result = await db.collection(COLLECTION_NAME).insertOne(formData)
    return result.insertedId
  } finally {
    await client.close()
  }
}

export const updateDraft = async (
  id: string,
  $set: Record<string, unknown>
) => {
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

export const deleteDraft = async (id: string) => {
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
