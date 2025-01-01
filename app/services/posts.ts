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
