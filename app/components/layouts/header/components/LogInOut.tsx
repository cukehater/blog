'use client'

import { signIn } from 'next-auth/react'

import NavItem from './NavItem.tsx'

export default function LogInOut() {
  return (
    <button type="button" aria-label="로그인" onClick={() => signIn()}>
      <NavItem content="로그인" />
    </button>
  )
}
