import { NextRequest, NextResponse } from 'next/server'

import {
  deleteDraft,
  getDraftById,
  insertDraft,
  updateDraft
} from '@/app/services/drafts'

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id')
  if (!id) return NextResponse.json({ message: 'id가 없습니다.' })
  const result = await getDraftById(id)

  return NextResponse.json({ data: result, message: '임시저장 글 조회 완료' })
}

export async function POST(req: NextRequest) {
  const body = await req.json()

  const id = await insertDraft(body)
  return NextResponse.json({ data: id, message: '임시저장 글 등록 완료' })
}

export async function PUT(req: NextRequest) {
  const body = await req.json()
  const { _id: id, ...formData } = body
  await updateDraft(id, formData)
  return NextResponse.json({ message: '임시저장 글 수정 완료' })
}

export async function DELETE(req: NextRequest) {
  const body = await req.json()
  const { id } = body
  await deleteDraft(id)
  return NextResponse.json({ message: '임시저장 글 삭제 완료' })
}
