import { ObjectId } from 'mongodb'
import { NextRequest, NextResponse } from 'next/server'

import { connectDB } from '@/app/shared/utils/connectDB'
import { ListItemType } from '@/app/types/types'

export async function DELETE(req: NextRequest) {
  const id: string | null = req.nextUrl.searchParams.get('id')

  if (!id) {
    return NextResponse.json({ message: 'No id' }, { status: 400 })
  }

  const db = (await connectDB).db('blog')
  await db
    .collection<ListItemType>('drafts')
    .deleteOne({ _id: new ObjectId(id) })

  return NextResponse.json({ message: 'success' })
}
