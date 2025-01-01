import Link from 'next/link'
import Inner from './Inner'
import Button from '../ui/Button'
import { getBlogTitle } from '@/app/services/profile'

export default async function Header() {
  const data = await getBlogTitle()

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
    <header className="fixed top-0 left-0 right-0 bg-[--primary-color] py-4">
      <Inner className="flex justify-between items-center">
        <Link href="/">
          <h1 className="text-2xl font-bold">{data?.blogTitle}</h1>
        </Link>

        <nav className="flex gap-2">
          {nav.map((item) => (
            <Link href={item.link} key={item.name}>
              <Button type="button">{item.name}</Button>
            </Link>
          ))}
          <Button type="button">로그아웃</Button>
        </nav>
      </Inner>
    </header>
  )
}
