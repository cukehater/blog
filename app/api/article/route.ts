import { NextRequest, NextResponse } from 'next/server'

import { deleteOne, findOne, insertOne, updateOne } from '@/app/utils/db.ts'
import registerDateFormat from '@/app/utils/registerDateFormat.ts'

export async function handler(req: NextRequest) {
  const { method } = req

  if (method === 'GET') {
    const id: string | null = req.nextUrl.searchParams.get('id')
    const type: string = req.nextUrl.searchParams.get('type') || 'posts'

    if (!id) {
      return NextResponse.json({ message: 'No ID' }, { status: 400 })
    }

    const formData = await findOne(type, id)
    return NextResponse.json({ message: 'Success', formData }, { status: 200 })
  }

  if (method === 'POST') {
    const body = await req.json()
    const type: string = req.nextUrl.searchParams.get('type') || 'posts'

    const registerDate = registerDateFormat(new Date())
    const formData = { ...body, registerDate }

    if (type === 'drafts') {
      const { insertedId } = await insertOne(type, formData)
      return NextResponse.json({
        message: 'Success',
        formData: { ...formData, _id: insertedId }
      })
    }

    // 임시 글에 할당된 _id 삭제
    if (type === 'posts') {
      const { _id: id, ...data } = formData
      await insertOne(type, data)
      return NextResponse.json({ message: 'Success' })
    }
  }

  if (method === 'PUT') {
    const { _id: id, ...body } = await req.json()
    const type: string = req.nextUrl.searchParams.get('type') || 'posts'

    await updateOne(type, id, { ...body })
    return NextResponse.json({ message: 'Success' })
  }

  if (method === 'DELETE') {
    const id: string | null = req.nextUrl.searchParams.get('id')
    const type: string = req.nextUrl.searchParams.get('type') || 'posts'

    if (!id) {
      return NextResponse.json({ message: 'No ID' }, { status: 400 })
    }

    await deleteOne(type, id)
    return NextResponse.json({ message: 'Success' })
  }

  return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 })
}

export const GET = handler
export const POST = handler
export const PUT = handler
export const DELETE = handler
