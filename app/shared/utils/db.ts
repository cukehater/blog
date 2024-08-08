import { ProfileData } from '@/app/types/types'
import { connectDB } from './connectDB'

export const getProfile = async () => {
  const db = (await connectDB).db('blog')
  return await db.collection<ProfileData>('profile').findOne({})
}
