import { ObjectId } from 'mongodb'
import Link from 'next/link'

import MarkDownPreview from '@/app/features/MarkDownPreview'
import Button from '@/app/shared/components/Button'
import Hash from '@/app/shared/components/Hash'
import InnerCol from '@/app/shared/components/InnerCol'
import { ArrowSvg } from '@/app/shared/components/svg/ArrowSvg'
import { ShareSvg } from '@/app/shared/components/svg/ShareSvg'
import { connectDB } from '@/app/shared/utils/connectDB'
import { dateFormat } from '@/app/shared/utils/dateFormat'
import { listItemType } from '@/app/types/types'
import { Metadata } from 'next'
import NoItems from '@/app/shared/components/NoItems'

export default async function Page({
  params: { id }
}: {
  params: { id: string }
}) {
  const db = (await connectDB).db('blog')
  const result = await db
    .collection<listItemType>('posts')
    .findOne({ _id: new ObjectId(id) })

  if (!result) {
    return <NoItems />
  }

  const metadata: Metadata = {
    title: result.title,
    description: result.description
  }

  return (
    <main>
      <InnerCol>
        <hgroup>
          <h2 className='text-[48px] font-bold'>{result.title}</h2>
          <div className='flex items-center gap-2 mt-10 justify-between'>
            <div className='flex items-center gap-2'>
              <span>Cukehater</span> &middot;
              <span className='text-gray-500'>
                {dateFormat(result.registerDate)}
              </span>
            </div>

            <div className='flex items-center gap-4'>
              <Link href='/' className='opacity-70 hover:opacity-100'>
                수정
              </Link>
              <button className='opacity-70 hover:opacity-100'>삭제</button>
              <button type='button'>
                <ShareSvg className='w-5 h-5' />
              </button>
            </div>
          </div>
        </hgroup>

        <div className='flex gap-2 mt-6'>
          {result.hashes.map(hash => (
            <Hash key={hash} hash={hash} />
          ))}
        </div>

        <div className='mt-10'>
          <MarkDownPreview contents={result.content} />
        </div>

        <div className='flex justify-between my-20'>
          <Link
            href='/'
            className='w-96 flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity'
          >
            <ArrowSvg className='w-10 h-10 mr-2' />
            <div className='flex-1'>
              <p className='text-sm mb-1'>이전 글</p>
              <p>Lorem, ipsum dolor. Lorem</p>
            </div>
          </Link>

          <Button text='목록' type='tertiary' className='font-bold px-8' />

          <Link
            href='/'
            className='text-right w-96 flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity'
          >
            <div className='flex-1'>
              <p className='text-sm mb-1'>다음 글</p>
              <p>Lorem, ipsum dolor.</p>
            </div>

            <ArrowSvg className='w-10 h-10 ml-2 rotate-180' />
          </Link>
        </div>
      </InnerCol>
    </main>
  )
}
