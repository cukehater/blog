import { ObjectId } from 'mongodb'
import { NextRequest, NextResponse } from 'next/server'

import { connectDB } from '@/app/shared/utils/connectDB'

export async function GET(req: NextRequest) {
  const id: string | null = req.nextUrl.searchParams.get('id')

  if (!id) {
    return NextResponse.json({ message: 'failed' }, { status: 400 })
  }

  const db = (await connectDB).db('blog')
  const collection = db.collection('drafts')
  const formData = await collection.findOne({ _id: new ObjectId(id) })

  return NextResponse.json({ message: 'success', formData }, { status: 200 })
}
