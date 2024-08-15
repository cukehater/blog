import { NextRequest, NextResponse } from 'next/server'

import { findOne } from '@/app/shared/utils/db.ts'

export async function GET(req: NextRequest) {
  const id: string | null = req.nextUrl.searchParams.get('id')

  if (!id) {
    return NextResponse.json({ message: 'No id' }, { status: 400 })
  }

  const formData = await findOne('drafts', id)

  return NextResponse.json({ message: 'success', formData }, { status: 200 })
}

export default GET
