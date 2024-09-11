import { NextRequest, NextResponse } from 'next/server'

export default async function middleware(req: NextRequest) {
  const response = NextResponse.next()

  if (req.nextUrl.pathname === '/write' || req.nextUrl.pathname === '/') {
    const searchParams = req.nextUrl.searchParams.toString()
    response.headers.set('x-search-params', searchParams)
  }

  return response
}
