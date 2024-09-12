import Link from 'next/link'
import { Session } from 'next-auth'

import DarkModeToggle from './components/DarkModeToggle.tsx'
import LogOut from './components/LogOut.tsx'
import NavItem from './components/NavItem.tsx'

import { getProfile } from '@/app/services/profileService.ts'
import { auth } from '@/auth.config.ts'

import InnerCol from '@/app/components/shared/components/InnerCol.tsx'

import type { ProfileData } from '@/app/types/types.ts'

async function Nav() {
  const session = (await auth()) as Session

  return (
    <nav className="flex items-center">
      {session && (
        <>
          <Link href="/write">
            <NavItem content="새 글 작성" />
          </Link>

          <Link href="/draft">
            <NavItem content="임시 글" />
          </Link>

          <Link href="/setting">
            <NavItem content="설정" />
          </Link>

          <LogOut />
        </>
      )}
      <DarkModeToggle />
    </nav>
  )
}

export default async function Header() {
  const profile = (await getProfile()) as unknown as ProfileData

  return (
    <header className="sticky top-0 left-0 w-full z-50 py-5 bg-[var(--background-color)]">
      <InnerCol className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Link href="/" scroll={false}>
            {profile?.blogTitle}
          </Link>
        </h1>
        <Nav />
      </InnerCol>
    </header>
  )
}
