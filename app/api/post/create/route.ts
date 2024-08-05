import { NextResponse } from 'next/server'

import { connectDB } from '@/app/shared/utils/connectDB'
import registerDateFormat from '@/app/shared/utils/registerDateFormat'

export async function POST(req: Request) {
  const body = await req.json()

  const registerDate = registerDateFormat(new Date())

  const formData = { ...body, registerDate }

  const db = (await connectDB).db('blog')
  await db.collection('posts').insertOne(formData)

  return NextResponse.json({
    message: 'Create success'
  })
}
