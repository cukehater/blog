'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { PrevOrNextPostType } from '@/app/models/posts'

import Button from './Button'
import ArrowSvg from './svg/ArrowSvg'

export default function PostNavigation({
  prevPost,
  nextPost
}: {
  prevPost: PrevOrNextPostType
  nextPost: PrevOrNextPostType
}) {
  const router = useRouter()

  return (
    <nav className="flex justify-between items-center">
      <div className="w-40 sm:w-56">
        {nextPost && (
          <Link
            href={`/posts/${nextPost._id.toString()}`}
            className="flex items-center gap-1 opacity-85 hover:opacity-100 transition-opacity"
          >
            <ArrowSvg className="w-7 h-7 mr-2" />
            <div className="flex-1">
              <p className="text-xs mb-1">다음 글</p>
              <p className="line-clamp-2 leading-5">{nextPost.title}</p>
            </div>
          </Link>
        )}
      </div>

      <Button
        type="button"
        highlight
        className="text-base px-6"
        onClick={() => router.push('/')}
      >
        목록으로
      </Button>

      <div className="w-40 sm:w-56">
        {prevPost && (
          <Link
            href={`/posts/${prevPost._id.toString()}`}
            className="text-right flex items-center gap-1 opacity-85 hover:opacity-100 transition-opacity"
          >
            <div className="flex-1">
              <p className="text-xs mb-1">이전 글</p>
              <p className="line-clamp-2 leading-5">{prevPost.title}</p>
            </div>
            <ArrowSvg className="w-7 h-7 ml-2 rotate-180" />
          </Link>
        )}
      </div>
    </nav>
  )
}
