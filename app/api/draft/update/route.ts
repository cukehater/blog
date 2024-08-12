import { closeDB, connectDB } from '@/app/shared/utils/db'
import { ObjectId } from 'mongodb'
import { NextResponse } from 'next/server'

export async function PUT(req: Request) {
  const { _id, ...body } = await req.json()

  const db = (await connectDB).db('blog')
  await db
    .collection('drafts')
    .updateOne({ _id: new ObjectId(_id) }, { $set: { ...body } })

  await closeDB

  return NextResponse.json({ message: 'Update success' })
}
