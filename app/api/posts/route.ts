import { getPostById, insertPost } from '@/app/services/posts'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const result = await insertPost(body)
  return NextResponse.json({ data: result, message: '게시글 작성 완료' })
}

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id') as string
  const result = await getPostById(id)
  return NextResponse.json({ data: result, message: '게시글 조회 완료' })
}
