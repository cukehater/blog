import { NextResponse } from 'next/server'

import { getProfile, updateProfile } from '@/app/services/profileService.ts'

export async function handler(req: Request) {
  const { method } = req

  if (method === 'GET') {
    const profile = await getProfile()
    return NextResponse.json({ message: 'Success', data: profile })
  }

  if (method === 'PUT') {
    const { _id: id, ...body } = await req.json()
    await updateProfile(id, body)
    return NextResponse.json({ message: 'Success' })
  }

  return NextResponse.json({ message: 'Failed' }, { status: 405 })
}

export const GET = handler
export const PUT = handler
