'use client'

import Button from '@/app/shared/components/Button'
import { ArrowSvg } from '@/app/shared/components/svg/ArrowSvg'
import { listItemType } from '@/app/types/types'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface BottomNavProps {
  previousPost: listItemType[]
  nextPost: listItemType[]
}

export default function BottomNav({ previousPost, nextPost }: BottomNavProps) {
  const router = useRouter()

  const prev = previousPost[0]
  const next = nextPost[0]

  return (
    <div className='flex justify-between my-20'>
      <div className='w-96'>
        {prev && (
          <Link
            href={`/detail/${prev._id}`}
            className=' flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity'
          >
            <ArrowSvg className='w-10 h-10 mr-2' />
            <div className='flex-1'>
              <p className='text-sm mb-1'>이전 글</p>
              <p>{prev.title}</p>
            </div>
          </Link>
        )}
      </div>

      <Button
        text='목록'
        type='tertiary'
        className='font-bold px-8'
        onClick={() => router.push('/')}
      />

      <div className='w-96'>
        {next && (
          <Link
            href={`/detail/${next._id}`}
            className='text-right w-96 flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity'
          >
            <div className='flex-1'>
              <p className='text-sm mb-1'>다음 글</p>
              <p>{next.title}</p>
            </div>

            <ArrowSvg className='w-10 h-10 ml-2 rotate-180' />
          </Link>
        )}
      </div>
    </div>
  )
}
