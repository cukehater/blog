import dbConnection from '../utils/dbConnection'

export const insertUser = async (id: string, password: string) => {
  const client = dbConnection()

  try {
    const db = client.db('blog')
    const collection = db.collection('user_cred')
    await collection.insertOne({ id, password })
  } finally {
    await client.close()
  }
}
