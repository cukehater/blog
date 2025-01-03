'use client'

import { useReducer } from 'react'
import ModalPortal from './layout/ModalPortal'
import Button from './Button'
import ModalConfirm from './ModalConfirm'
import axios from 'axios'
import { useRouter } from 'next/navigation'

type Props = {
  postId: string
  type: 'draft' | 'post'
}

export default function PostDeleteButton({ postId, type }: Props) {
  const router = useRouter()
  const [isConfirmModalOpen, toggleConfirmModal] = useReducer(
    (prev) => !prev,
    false
  )

  const handleDelete = async () => {
    await axios.delete(`/api/${type}s`, { data: { id: postId } })
    toggleConfirmModal()
    if (type === 'post') {
      router.push('/')
    } else {
      router.refresh()
    }
  }

  const handleConfirm = () => {
    toggleConfirmModal()
  }

  return (
    <>
      <Button type="button" onClick={handleConfirm}>
        삭제
      </Button>

      {isConfirmModalOpen && (
        <ModalPortal>
          <ModalConfirm
            title={`${
              type === 'post' ? '포스트를' : '임시 글을'
            } 삭제하시겠습니까?`}
            confirmText="삭제"
            cancelText="취소"
            onConfirm={handleDelete}
            onCancel={toggleConfirmModal}
          />
        </ModalPortal>
      )}
    </>
  )
}
