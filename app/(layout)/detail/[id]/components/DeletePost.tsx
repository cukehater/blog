'use client'

import { useReducer } from 'react'

import axios from 'axios'
import { useRouter } from 'next/navigation'

import ModalConfirm from '@/app/components/shared/components/ModalConfirm.tsx'

export default function DeletePost({ id }: { id: string }) {
  const [isModalOpen, modalToggle] = useReducer((prev) => !prev, false)
  const router = useRouter()

  const handleDeletePost = async () => {
    await axios.delete(`/api/article?id=${id}&type=posts`)
    router.push('/')
  }

  return (
    <>
      <button
        type="button"
        className="opacity-70 hover:opacity-100"
        onClick={modalToggle}
      >
        삭제
      </button>

      {isModalOpen && (
        <ModalConfirm
          title="게시글 삭제"
          description="삭제된 게시글은 복구할 수 없습니다."
          confirmText="삭제"
          cancelText="취소"
          onConfirm={handleDeletePost}
          onCancel={modalToggle}
        />
      )}
    </>
  )
}
