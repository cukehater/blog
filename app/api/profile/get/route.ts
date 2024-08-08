import { NextResponse } from 'next/server'

import { connectDB } from '@/app/shared/utils/connectDB'

export async function GET() {
  const db = (await connectDB).db('blog')
  const data = await db.collection('profile').findOne({})

  return NextResponse.json({ message: 'Update success', data })
}
