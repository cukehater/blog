import { NextResponse } from 'next/server'

import { closeDB, connectDB } from '@/app/shared/utils/db.ts'
import registerDateFormat from '@/app/shared/utils/registerDateFormat.ts'

export default async function POST(req: Request) {
  const body = await req.json()

  const registerDate = registerDateFormat(new Date())

  const formData = { ...body, registerDate }

  const db = (await connectDB).db('blog')
  const { insertedId } = await db.collection('drafts').insertOne(formData)

  await closeDB

  return NextResponse.json({
    message: 'Create success',
    formData: { ...formData, _id: insertedId }
  })
}
