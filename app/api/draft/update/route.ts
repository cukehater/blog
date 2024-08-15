import { NextResponse } from 'next/server'

import { updateOne } from '@/app/shared/utils/db.ts'

export default async function PUT(req: Request) {
  const { _id, ...body } = await req.json()

  await updateOne('drafts', _id, { ...body })

  return NextResponse.json({ message: 'Update success' })
}
