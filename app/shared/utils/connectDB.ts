import { MongoClient } from 'mongodb'

const uri: string = String(process.env.NEXT_MONGO_URI)
export const connectDB: Promise<MongoClient> = new MongoClient(uri).connect()
