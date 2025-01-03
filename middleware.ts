import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default function middleware(req: NextRequest) {
  const search = req.nextUrl.search

  const response = NextResponse.next()
  response.headers.set('x-search', search)

  return response
}
