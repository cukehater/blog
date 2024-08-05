import { ObjectId } from 'mongodb'
import { NextRequest, NextResponse } from 'next/server'

import { connectDB } from '@/app/shared/utils/connectDB'
import { listItemType } from '@/app/types/types'

export async function DELETE(req: NextRequest) {
  const id: string | null = req.nextUrl.searchParams.get('id')

  if (!id) {
    return NextResponse.json({ message: 'No id' }, { status: 400 })
  }

  const db = (await connectDB).db('blog')
  await db
    .collection<listItemType>('drafts')
    .deleteOne({ _id: new ObjectId(id) })

  return NextResponse.json({ message: 'success' })
}
