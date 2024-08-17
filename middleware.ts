import { NextRequest, NextResponse } from 'next/server'

export default async function middleware(req: NextRequest) {
  const response = NextResponse.next()

  // 메인 페이지 접속 시 searchParams 출력 및 헤더에 추가
  if (req.nextUrl.pathname === '/') {
    const searchParams = req.nextUrl.searchParams.toString()
    response.headers.set('x-search-params', searchParams)
  }

  return response
}
