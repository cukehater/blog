import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // 응답 헤더에 pathname 추가
  const response = NextResponse.next()
  response.headers.set('x-pathname', pathname)

  return response
}
