import { ObjectId } from 'mongodb'
import { Metadata } from 'next'
import Link from 'next/link'

import BottomNav from '@/app/features/detail/BottomNav.tsx'
import MarkDownPreview from '@/app/features/detail/MarkDownPreview.tsx'
import Hash from '@/app/shared/components/Hash.tsx'
import InnerCol from '@/app/shared/components/InnerCol.tsx'
import NoItems from '@/app/shared/components/NoItems.tsx'
import ShareSvg from '@/app/shared/components/svg/ShareSvg.tsx'
import dateFormat from '@/app/shared/utils/dateFormat.ts'
import { closeDB, connectDB } from '@/app/shared/utils/db.ts'
import { ListItemType, ProfileData } from '@/app/types/types.ts'

export const metadata: Metadata = {
  title: 'Cukehater',
  description: 'Cukehater'
}

function Hashes({ hashes }: { hashes: string[] }) {
  return (
    <div className="flex gap-2 mt-6">
      {hashes.map((hash) => (
        <Hash key={hash} hash={hash} />
      ))}
    </div>
  )
}

export default async function Page({
  params: { id }
}: {
  params: { id: string }
}) {
  const db = (await connectDB).db('blog')
  const postsCollection = db.collection<ListItemType>('posts')
  const profileCollection = db.collection<ProfileData>('profile')

  const [post, profile, previousPost, nextPost] = await Promise.all([
    postsCollection.findOne({ _id: new ObjectId(id) }),
    profileCollection.findOne({}),
    postsCollection
      .find({ _id: { $lt: new ObjectId(id) } })
      .sort({ _id: -1 })
      .limit(1)
      .toArray(),
    postsCollection
      .find({ _id: { $gt: new ObjectId(id) } })
      .sort({ _id: 1 })
      .limit(1)
      .toArray()
  ])

  await closeDB

  const convertIdToString = (obj: ListItemType) => {
    if (!obj?._id) return false

    return {
      ...obj,
      _id: obj._id.toString()
    }
  }

  if (!post) {
    return <NoItems />
  }

  return (
    <main>
      <InnerCol className="">
        <hgroup>
          <h2 className="text-[48px] font-bold">{post.title}</h2>
          <div className="flex items-center gap-2 mt-10 justify-between">
            <div className="flex items-center gap-2">
              <span>{profile?.nickname}</span> &middot;
              <span className="text-gray-500">
                {dateFormat(post.registerDate)}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href={`/write/${id}?edit=true`}
                className="opacity-70 hover:opacity-100"
              >
                수정
              </Link>
              <button type="button" className="opacity-70 hover:opacity-100">
                삭제
              </button>
              <button type="button">
                공유하기
                <ShareSvg className="w-5 h-5" />
              </button>
            </div>
          </div>
        </hgroup>

        <Hashes hashes={post.hashes} />
        <MarkDownPreview contents={post.content} />
        <BottomNav
          prevPost={convertIdToString(previousPost[0] as ListItemType) || false}
          nextPost={convertIdToString(nextPost[0] as ListItemType) || false}
        />
      </InnerCol>
    </main>
  )
}
