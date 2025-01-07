import { ObjectId } from 'mongodb'

import { PostType } from '@/app/models/posts'

import dbConnection from '../utils/dbConnection'

const DB_NAME = 'blog'
const COLLECTION_NAME = 'drafts'

export async function getAllDrafts() {
  const client = dbConnection()

  try {
    const db = client.db(DB_NAME)
    const collection = db.collection(COLLECTION_NAME)
    const result = await collection.find({}).sort({ regDate: -1 }).toArray()
    return result
  } finally {
    await client.close()
  }
}

export const insertDraft = async (formData: PostType) => {
  const client = dbConnection()

  try {
    const db = (await client.connect()).db(DB_NAME)
    const result = await db.collection(COLLECTION_NAME).insertOne(formData)
    return result.insertedId
  } finally {
    await client.close()
  }
}

export const updateDraft = async (id: string, formData: PostType) => {
  const client = dbConnection()

  try {
    const db = (await client.connect()).db(DB_NAME)
    const result = await db
      .collection(COLLECTION_NAME)
      .updateOne({ _id: new ObjectId(id) }, { $set: formData })
    return result
  } finally {
    await client.close()
  }
}

export const getDraftById = async (id: string) => {
  const client = dbConnection()

  try {
    const db = (await client.connect()).db(DB_NAME)
    const result = await db
      .collection(COLLECTION_NAME)
      .findOne({ _id: new ObjectId(id) })
    return result
  } finally {
    await client.close()
  }
}

export const deleteDraft = async (id: string) => {
  const client = dbConnection()

  try {
    const db = (await client.connect()).db(DB_NAME)
    const result = await db
      .collection(COLLECTION_NAME)
      .deleteOne({ _id: new ObjectId(id) })
    return result
  } finally {
    await client.close()
  }
}
