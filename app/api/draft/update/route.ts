import { ObjectId } from 'mongodb'
import { NextResponse } from 'next/server'

import { connectDB } from '@/app/shared/utils/connectDB'

export async function POST(req: Request) {
  const { _id, ...body } = await req.json()

  const db = (await connectDB).db('blog')
  await db
    .collection('drafts')
    .updateOne({ _id: new ObjectId(_id) }, { $set: { ...body } })

  return NextResponse.json({ message: 'Update success' })
}
