import Link from 'next/link'

import DarkModeToggle from './components/DarkModeToggle.tsx'

import { getProfile } from '@/app/services/profileService.ts'

import InnerCol from '@/app/components/shared/components/InnerCol.tsx'
import NavItem from '@/app/components/shared/components/NavItem.tsx'

import type { ProfileData } from '@/app/types/types.ts'

function Nav() {
  return (
    <nav className="flex items-center">
      <Link href="/write">
        <NavItem content="새 글 작성" />
      </Link>

      <Link href="/draft">
        <NavItem content="임시 글" />
      </Link>
      <Link href="/setting">
        <NavItem content="설정" />
      </Link>
      <Link href="/logout">
        <NavItem content="로그아웃" />
      </Link>
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
