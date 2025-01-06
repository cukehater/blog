import { MongoClient, MongoClientOptions } from 'mongodb'

const URI: string = String(process.env.NEXT_MONGO_URI)

if (!URI) {
  throw new Error('MongoDB URI을 설정해 주세요.')
}

export default function dbConnection(callback?: MongoClientOptions) {
  return new MongoClient(URI, callback)
}
