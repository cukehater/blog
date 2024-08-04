import Button from '@/app/shared/components/Button'
import Hash from '@/app/shared/components/Hash'
import Editor from '@/app/features/MarkDownEditor'
import Link from 'next/link'
import { ArrowSvg } from '../shared/components/svg/ArrowSvg'
import HashMaker from '../shared/components/HashMaker'

export default function Page() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Nav />
      <div className='py-8 px-4'>
        <div>
          <input
            type='text'
            className='w-full text-3xl bg-transparent mb-4'
            placeholder='제목을 입력해 주세요'
          />
        </div>

        <HashMaker />
      </div>

      <Editor />
    </div>
  )
}

const Nav = () => {
  return (
    <nav className='h-20 bg-[var(--border-color)]  flex items-center px-4'>
      <Link href='/'>
        <Button
          text={
            <>
              <ArrowSvg className='w-6 h-6' />
              돌아가기
            </>
          }
        />
      </Link>
      <div className='flex ml-auto gap-2'>
        <Button text='임시저장' type='secondary' />
        <Button text='발행하기' type='tertiary' />
      </div>
    </nav>
  )
}
