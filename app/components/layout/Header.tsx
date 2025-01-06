import Link from 'next/link'
import Inner from './Inner'
import Button from '../Button'
import { getBlogTitle } from '@/app/services/profile'
import { auth } from '@/auth'
import { signOut } from 'next-auth/react'

export default async function Header() {
  const session = await auth()
  const data = await getBlogTitle()

  const nav = [
    {
      name: '새 글',
      link: '/write'
    },
    {
      name: '임시 글',
      link: '/drafts'
    },
    {
      name: '설정',
      link: '/profile'
    }
  ]

  return (
    <header className="fixed top-0 left-0 right-0 bg-[--primary-color] py-4 z-10">
      <Inner className="flex items-center justify-between">
        <Link href="/">
          <h1 className="text-2xl font-bold">{data?.blogTitle}</h1>
        </Link>

        {session && (
          <nav className="flex gap-1 md:gap-2">
            {nav.map((item) => (
              <Link href={item.link} key={item.name}>
                <Button type="button" className="!px-3 md:!px-4">
                  {item.name}
                </Button>
              </Link>
            ))}
            <Button type="button" className="!px-3 md:!px-4" onClick={signOut}>
              로그아웃
            </Button>
          </nav>
        )}
      </Inner>
    </header>
  )
}
