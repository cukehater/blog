import { MongoClient, MongoClientOptions, ObjectId } from 'mongodb'

const URI: string = String(process.env.NEXT_MONGO_URI)
const options: MongoClientOptions = {
  // maxPoolSize: 10,
  // connectTimeoutMS: 30000,
  // serverSelectionTimeoutMS: 30000,
  // socketTimeoutMS: 30000
}

if (!URI) {
  throw new Error('Please set your MongoDB URI')
}

const client: MongoClient = new MongoClient(URI, options)

export const connectDB = client.connect()
export const closeDB = client.close()

export const findAll = async (collection: string) => {
  const db = client.db('blog')
  const result = await db.collection(collection).find().toArray()
  await closeDB
  return result
}

export const findOne = async (collection: string, id: string) => {
  const db = client.db('blog')
  const result = await db
    .collection(collection)
    .findOne({ _id: new ObjectId(id) })
  await closeDB
  return result
}
