import { NextResponse } from 'next/server'

import { findAll } from '@/app/shared/utils/db.ts'

export default async function GET() {
  const result = await findAll('profile')

  return NextResponse.json({ message: 'Update success', data: result[0] })
}
