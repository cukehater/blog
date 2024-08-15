import { NextResponse } from 'next/server'

import { updateOne } from '@/app/shared/utils/db.ts'

export async function PUT(req: Request) {
  const { _id: id, ...body } = await req.json()

  await updateOne('drafts', id, { ...body })

  return NextResponse.json({ message: 'Update success' })
}

export default PUT
