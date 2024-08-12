import { Metadata } from 'next'

import { ObjectId } from 'mongodb'
import Link from 'next/link'

import BottomNav from '@/app/features/detail/BottomNav'
import MarkDownPreview from '@/app/features/detail/MarkDownPreview'
import Hash from '@/app/shared/components/Hash'
import InnerCol from '@/app/shared/components/InnerCol'
import NoItems from '@/app/shared/components/NoItems'
import { ShareSvg } from '@/app/shared/components/svg/ShareSvg'
import { dateFormat } from '@/app/shared/utils/dateFormat'
import { ListItemType, ProfileData } from '@/app/types/types'
import { closeDB, connectDB } from '@/app/shared/utils/db'

export const metadata: Metadata = {
  title: 'Cukehater',
  description: 'Cukehater'
}

export default async function Page({
  params: { id }
}: {
  params: { id: string }
}) {
  const db = (await connectDB).db('blog')
  const collection = db.collection<ListItemType>('posts')
  const result = await collection.findOne({ _id: new ObjectId(id) })
  const profile = await db.collection<ProfileData>('profile').findOne({})

  await closeDB

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

  return (
    <main>
      <InnerCol>
        <hgroup>
          <h2 className='text-[48px] font-bold'>{result.title}</h2>
          <div className='flex items-center gap-2 mt-10 justify-between'>
            <div className='flex items-center gap-2'>
              <span>{profile?.nickname}</span> &middot;
              <span className='text-gray-500'>
                {dateFormat(result.registerDate)}
              </span>
            </div>

            <div className='flex items-center gap-4'>
              <Link
                href={`/write/${id}?edit=true`}
                className='opacity-70 hover:opacity-100'
              >
                수정
              </Link>
              <button className='opacity-70 hover:opacity-100'>삭제</button>
              <button type='button'>
                <ShareSvg className='w-5 h-5' />
              </button>
            </div>
          </div>
        </hgroup>

        <Hashes hashes={result.hashes} />
        <MarkDownPreview contents={result.content} />
        <BottomNav previousPost={previousPost} nextPost={nextPost} />
      </InnerCol>
    </main>
  )
}

const Hashes = ({ hashes }: { hashes: string[] }) => {
  return (
    <div className='flex gap-2 mt-6'>
      {hashes.map(hash => (
        <Hash key={hash} hash={hash} />
      ))}
    </div>
  )
}
