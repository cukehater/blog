'use client'

import { signOut } from 'next-auth/react'

import NavItem from './NavItem.tsx'

export default function LogOut() {
  return (
    <button
      type="button"
      aria-label="로그아웃"
      onClick={() => {
        signOut()
      }}
    >
      <NavItem content="로그아웃" />
    </button>
  )
}
