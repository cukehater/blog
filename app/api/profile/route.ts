import { NextResponse } from 'next/server'

import { getProfile, updateProfile } from '@/app/services/profileService.ts'

export async function GET() {
  const profile = await getProfile()
  return NextResponse.json({ message: 'Success', data: profile })
}

export async function PUT(req: Request) {
  const { _id: id, ...body } = await req.json()
  await updateProfile(id, body)
  return NextResponse.json({ message: 'Success' })
}
