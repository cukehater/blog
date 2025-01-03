'use client'

import { useRouter } from 'next/navigation'
import Button from './Button'

export default function PostEditButton({ postId }: { postId: string }) {
  const router = useRouter()

  return (
    <Button
      type="button"
      onClick={() => router.push(`/write?id=${postId}&edit=true`)}
    >
      수정
    </Button>
  )
}
