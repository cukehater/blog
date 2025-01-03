import Link from 'next/link'
import Inner from './Inner'
import Button from '../Button'
import { getBlogTitle } from '@/app/services/profile'
import { auth } from '@/auth'
import { signIn } from 'next-auth/react'

export default async function Header() {
  const data = await getBlogTitle()
  const session = await auth()

  const nav = [
    {
      name: '새 글 작성',
      link: '/write'
    },
    {
      name: '임시 글',
      link: '/drafts'
    },
    {
      name: '프로필 설정',
      link: '/profile'
    }
  ]

  return (
    <header className="fixed top-0 left-0 right-0 bg-[--primary-color] py-4 z-10">
      <Inner className="flex justify-between items-center">
        <Link href="/">
          <h1 className="text-2xl font-bold">{data?.blogTitle}</h1>
        </Link>

        {!session && (
          <nav className="flex gap-2">
            {nav.map((item) => (
              <Link href={item.link} key={item.name}>
                <Button type="button">{item.name}</Button>
              </Link>
            ))}
            <Button type="button">로그아웃</Button>
          </nav>
        )}

        {!session && (
          <Button type="button" onClick={signIn}>
            로그인
          </Button>
        )}
      </Inner>
    </header>
  )
}
