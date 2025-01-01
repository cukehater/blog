import dbConnection from '../utils/dbComnnet'

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
