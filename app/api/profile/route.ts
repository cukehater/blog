import { getProfile } from '@/app/services/profile'
import { NextResponse } from 'next/server'

export async function GET() {
  const result = await getProfile()
  return NextResponse.json({ message: '프로필 조회 완료', data: result })
}
