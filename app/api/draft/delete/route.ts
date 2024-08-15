import { NextRequest, NextResponse } from 'next/server'

import { deleteOne } from '@/app/shared/utils/db.ts'

export default async function DELETE(req: NextRequest) {
  const id: string | null = req.nextUrl.searchParams.get('id')

  if (!id) {
    return NextResponse.json({ message: 'No id' }, { status: 400 })
  }

  await deleteOne('drafts', id)

  return NextResponse.json({ message: 'success' })
}
