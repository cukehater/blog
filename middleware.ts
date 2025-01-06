import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import NextAuth from 'next-auth'
import { authConfig } from './auth.config'

const { auth } = NextAuth(authConfig)
export default auth(async function middleware(req: NextRequest) {
  const search = req.nextUrl.search

  // 로그인 페이지 인증 관련 체크
  const session = await auth()
  const isLoggin = !!session
  const isLoginPage = req.nextUrl.pathname.includes('/login')

  // 로그인 페이지 시크릿 키 쿼리 파라미터 확인
  const secretkey = req.nextUrl.searchParams.get('key')
  const isSecretKeyValid = secretkey === process.env.NEXT_LOGIN_PAGE_SECRET_KEY

  if (isLoginPage) {
    if (isLoggin || !isSecretKeyValid) {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  const restrictedArray = ['/write', '/drafts', '/profile']
  const isRestrictedPage = restrictedArray.some((path) =>
    req.nextUrl.pathname.includes(path)
  )

  if (!isLoggin) {
    if (isRestrictedPage) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  const response = NextResponse.next()
  response.headers.set('x-search', search)
  return response
})
