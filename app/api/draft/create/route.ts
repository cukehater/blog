import { NextResponse } from 'next/server'

import { connectDB } from '@/app/shared/utils/connectDB'
import registerDateFormat from '@/app/shared/utils/registerDateFormat'

export async function POST(req: Request) {
  const body = await req.json()

  const registerDate = registerDateFormat(new Date())

  const db = (await connectDB).db('blog')
  await db.collection('drafts').insertOne({ ...body, registerDate })

  return NextResponse.json({ message: 'Create success' })
}
