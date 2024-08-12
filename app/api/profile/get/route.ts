import { closeDB, connectDB } from '@/app/shared/utils/db'
import { NextResponse } from 'next/server'

export async function GET() {
  const db = (await connectDB).db('blog')
  const data = await db.collection('profile').findOne({})

  await closeDB

  return NextResponse.json({ message: 'Update success', data })
}
