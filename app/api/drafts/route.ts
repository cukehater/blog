import { getDraftById, insertDraft, updateDraft } from '@/app/services/drafts'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id')
  if (!id) return NextResponse.json({ message: 'id가 없습니다.' })
  const result = await getDraftById(id)

  return NextResponse.json({ data: result, message: '임시저장 조회 완료' })
}

export async function POST(req: NextRequest) {
  const body = await req.json()

  const id = await insertDraft(body)
  return NextResponse.json({ data: id, message: '임시저장 등록 완료' })
}

export async function PUT(req: NextRequest) {
  const body = await req.json()
  const { _id, ...formData } = body
  await updateDraft(_id, formData)
  return NextResponse.json({ message: '임시저장 수정 완료' })
}
