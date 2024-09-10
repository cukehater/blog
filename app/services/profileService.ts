import { MongoClient } from 'mongodb'

import dbConnection from '../configs/dbConnection.ts'

export const getProfile = async () => {
  const client: MongoClient = dbConnection()

  try {
    const db = (await client.connect()).db('blog')
    const result = await db.collection('profile').find().toArray()
    return result[0]
  } finally {
    await client.close()
  }
}

export const getNickname = async () => {
  const client: MongoClient = dbConnection()

  try {
    const db = (await client.connect()).db('blog')
    const result = await db
      .collection('profile')
      .find({}, { projection: { nickname: 1 } })
      .limit(1)
      .toArray()

    return result[0].nickname
  } finally {
    await client.close()
  }
}
