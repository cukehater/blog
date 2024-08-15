import { NextResponse } from 'next/server'

import { insertOne } from '@/app/shared/utils/db.ts'
import registerDateFormat from '@/app/shared/utils/registerDateFormat.ts'

export default async function POST(req: Request) {
  const body = await req.json()

  const registerDate = registerDateFormat(new Date())

  const formData = { ...body, registerDate }

  const { insertedId } = await insertOne('drafts', formData)

  return NextResponse.json({
    message: 'Create success',
    formData: { ...formData, _id: insertedId }
  })
}
