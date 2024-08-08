import { NextResponse } from 'next/server'

import { connectDB } from '@/app/shared/utils/connectDB'
import { ObjectId } from 'mongodb'

export async function PUT(req: Request) {
  const { _id, ...body } = await req.json()

  const db = (await connectDB).db('blog')
  await db
    .collection('profile')
    .updateOne({ _id: new ObjectId(_id) }, { $set: body })

  return NextResponse.json({ message: 'Update success' })
}
