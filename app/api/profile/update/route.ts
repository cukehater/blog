import { NextResponse } from 'next/server'

import { updateOne } from '@/app/utils/db.ts'

export async function PUT(req: Request) {
  const { _id: id, ...body } = await req.json()

  await updateOne('profile', id, body)

  return NextResponse.json({ message: 'Update success' })
}

export default PUT
