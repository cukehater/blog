import { ObjectId } from 'mongodb'
import Link from 'next/link'

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
import MarkDownPreview from '@/app/features/detail/MarkDownPreview'
import BottomNav from '@/app/features/detail/BottomNav'

export default async function Page({
  params: { id }
}: {
  params: { id: string }
}) {
  const db = (await connectDB).db('blog')
  const collection = db.collection<listItemType>('posts')
  const result = await collection.findOne({ _id: new ObjectId(id) })

  const previousPost = await collection
    .find({ _id: { $lt: new ObjectId(id) } })
    .sort({ _id: -1 })
    .limit(1)
    .toArray()

  const nextPost = await collection
    .find({ _id: { $gt: new ObjectId(id) } })
    .sort({ _id: 1 })
    .limit(1)
    .toArray()

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

        <BottomNav previousPost={previousPost} nextPost={nextPost} />
      </InnerCol>
    </main>
  )
}
