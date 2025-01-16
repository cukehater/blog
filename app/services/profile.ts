import { ObjectId } from 'mongodb'
import { NextResponse } from 'next/server'

import { ProfileType } from '../models/profile'

import dbConnection from '../utils/dbConnection'

const DB_NAME = 'blog'
const COLLECTION_NAME = 'profile'

export async function getProfile() {
  const client = dbConnection()

  try {
    const db = client.db(DB_NAME)
    const collection = db.collection(COLLECTION_NAME)
    return await collection.findOne({})
  } catch (error) {
    console.error(error)
    return null
  } finally {
    await client.close()
  }
}

export async function getBlogTitle() {
  const client = dbConnection()

  try {
    const db = client.db(DB_NAME)
    const collection = db.collection(COLLECTION_NAME)
    return await collection.findOne({}, { projection: { blogTitle: 1 } })
  } catch (error) {
    console.error(error)
    return null
  } finally {
    await client.close()
  }
}

export async function updateProfile(data: ProfileType) {
  const client = dbConnection()

  try {
    const db = client.db(DB_NAME)
    const collection = db.collection(COLLECTION_NAME)

    const { _id: id, ...rest } = data
    await collection.updateOne({ _id: new ObjectId(id) }, { $set: rest })

    return NextResponse.json({ message: '프로필 업데이트 완료' })
  } catch (error) {
    console.error(error)
    return null
  } finally {
    await client.close()
  }
}
