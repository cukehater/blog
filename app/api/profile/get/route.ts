import { NextResponse } from 'next/server'

import { findAll } from '@/app/shared/utils/db.ts'

export async function GET() {
  const result = await findAll('profile')

  return NextResponse.json({ message: 'Update success', data: result[0] })
}

export default GET
