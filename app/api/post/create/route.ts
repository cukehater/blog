import { NextResponse } from 'next/server'

import { insertOne } from '@/app/utils/db.ts'
import registerDateFormat from '@/app/utils/registerDateFormat.ts'

export async function POST(req: Request) {
  const { _id: id, ...body } = await req.json()
  const registerDate = registerDateFormat(new Date())
  const formData = { ...body, registerDate }

  await insertOne('posts', formData)

  return NextResponse.json({
    message: 'Create success'
  })
}

export default POST
