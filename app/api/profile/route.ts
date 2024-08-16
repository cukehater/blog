import { NextResponse } from 'next/server'

import { findAll, updateOne } from '@/app/utils/db.ts'

export async function handler(req: Request) {
  const { method } = req

  if (method === 'GET') {
    const result = await findAll('profile')
    return NextResponse.json({ message: 'Success', data: result[0] })
  }

  if (method === 'PUT') {
    const { _id: id, ...body } = await req.json()
    await updateOne('profile', id, body)
    return NextResponse.json({ message: 'Success' })
  }

  return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 })
}

export const GET = handler
export const PUT = handler
