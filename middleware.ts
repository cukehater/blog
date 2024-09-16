import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export default async function middleware(req: NextRequest) {
  const response = NextResponse.next()
  if (req.nextUrl.pathname === '/write' || req.nextUrl.pathname === '/') {
    const searchParams = req.nextUrl.searchParams.toString()
    response.headers.set('x-search-params', searchParams)
  }

  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET as string,
    salt: ''
  })

  if (
    req.nextUrl.pathname === '/write' ||
    req.nextUrl.pathname === '/setting' ||
    req.nextUrl.pathname === '/draft'
  ) {
    if (!token) {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  return response
}
