import { NextRequest, NextResponse } from 'next/server'

import { getProfile, updateProfile } from '@/app/services/profile'

export async function GET() {
  const result = await getProfile()
  return NextResponse.json({ message: '프로필 조회 완료', data: result })
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  await updateProfile(body)
  return NextResponse.json({ message: '프로필 업데이트 완료' })
}
