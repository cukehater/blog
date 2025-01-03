import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const search = request.nextUrl.search

  const response = NextResponse.next()
  response.headers.set('x-search', search)

  return response
}
