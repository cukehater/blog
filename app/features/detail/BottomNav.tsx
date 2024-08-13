'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import Button from '@/app/shared/components/Button.tsx'
import ArrowSvg from '@/app/shared/components/svg/ArrowSvg.tsx'
import { ListItemType } from '@/app/types/types.ts'

interface BottomNavProps {
  prevPost: ListItemType
  nextPost: ListItemType
}

export default function BottomNav({ prevPost, nextPost }: BottomNavProps) {
  const router = useRouter()

  return (
    <nav className="flex justify-between my-20">
      <div className="w-56">
        {nextPost && (
          <Link
            href={`/detail/${nextPost._id}`}
            className="flex items-center gap-1 opacity-70 hover:opacity-100 transition-opacity"
          >
            <ArrowSvg className="w-7 h-7 mr-2" />
            <div className="flex-1">
              <p className="text-xs mb-1">다음 글</p>
              <p className="text-lg">{nextPost.title}</p>
            </div>
          </Link>
        )}
      </div>

      <Button
        text="목록"
        type="tertiary"
        className="font-bold px-8"
        onClick={() => router.push('/')}
      />

      <div className="w-56">
        {prevPost && (
          <Link
            href={`/detail/${prevPost._id?.toString()}`}
            className="text-right flex items-center gap-1 opacity-70 hover:opacity-100 transition-opacity"
          >
            <div className="flex-1">
              <p className="text-xs mb-1">이전 글</p>
              <p className="text-lg">{prevPost.title}</p>
            </div>
            <ArrowSvg className="w-7 h-7 ml-2 rotate-180" />
          </Link>
        )}
      </div>
    </nav>
  )
}
