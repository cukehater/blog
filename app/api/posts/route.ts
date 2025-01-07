import { NextRequest, NextResponse } from 'next/server'

import {
  deletePost,
  getPostById,
  insertPost,
  updatePost
} from '@/app/services/posts'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const result = await insertPost(body)
  return NextResponse.json({ data: result, message: '포스트 작성 완료' })
}

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id') as string
  const result = await getPostById(id)
  return NextResponse.json({ data: result, message: '포스트 조회 완료' })
}

export async function DELETE(req: NextRequest) {
  const body = await req.json()
  const { id } = body
  await deletePost(id)
  return NextResponse.json({ message: '포스트 삭제 완료' })
}

export async function PUT(req: NextRequest) {
  const body = await req.json()
  const { id, ...data } = body
  await updatePost(id, data)
  return NextResponse.json({ message: '포스트 수정 완료' })
}
