import { ProfileData } from '@/app/types/types'

import { MongoClient, MongoClientOptions } from 'mongodb'

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
