import Button from '@/app/shared/components/Button'
import Hash from '@/app/shared/components/Hash'
import Editor from '@/app/features/MarkDownEditor'
import Link from 'next/link'

export default function Page() {
  return (
    <div className='flex flex-col min-h-screen'>
      <div className='h-20 bg-[var(--border-color)]  flex items-center px-4'>
        <Link href='/'>
          <Button text='돌아가기' />
        </Link>
        <div className='flex ml-auto gap-2'>
          <Button text='임시저장' type='secondary' />
          <Button text='출간하기' type='tertiary' />
        </div>
      </div>

      <div className='w-1/2 py-8 px-4'>
        <div>
          <input
            type='text'
            className='w-full text-3xl bg-transparent mb-4'
            placeholder='제목을 입력해 주세요'
          />
        </div>

        <div className='flex gap-2 mt-4 flex-wrap'>
          <Hash hash='해쉬' />
          <Hash hash='해쉬' />
          <Hash hash='해쉬' />

          <input
            type='text'
            className='bg-transparent w-40 block'
            placeholder='태그를 입력해 주세요'
          />
        </div>
      </div>

      <Editor />
    </div>
  )
}
