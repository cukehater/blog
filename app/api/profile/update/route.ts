import { NextResponse } from 'next/server'

import { ObjectId } from 'mongodb'
import { closeDB, connectDB } from '@/app/shared/utils/db'

export async function PUT(req: Request) {
  const { _id, ...body } = await req.json()

  const db = (await connectDB).db('blog')
  await db
    .collection('profile')
    .updateOne({ _id: new ObjectId(_id) }, { $set: body })

  await closeDB

  return NextResponse.json({ message: 'Update success' })
}
