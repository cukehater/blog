import { NextResponse } from 'next/server'

import { closeDB, connectDB } from '@/app/shared/utils/db.ts'

export default async function GET() {
  const db = (await connectDB).db('blog')
  const data = await db.collection('profile').findOne({})

  await closeDB

  return NextResponse.json({ message: 'Update success', data })
}
