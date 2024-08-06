import { useReducer } from 'react'

import { useRouter } from 'next/navigation'

import Button from '@/app/shared/components/Button'
import ModalConfirm from '@/app/shared/components/ModalConfirm'
import { ArrowSvg } from '@/app/shared/components/svg/ArrowSvg'

export default function TopNav({
  handleSaveDraft,
  handlePublish,
  handleEdit,
  isEdit
}: {
  handleSaveDraft: () => void
  handlePublish: () => void
  handleEdit: () => void
  isEdit?: boolean
}) {
  const router = useRouter()
  const [isModalOpen, modalToggle] = useReducer(prev => !prev, false)

  return (
    <>
      <nav className='h-20 bg-[var(--border-color)]  flex items-center px-4'>
        <Button
          text={
            <>
              <ArrowSvg className='w-6 h-6' />
              돌아가기
            </>
          }
          onClick={() => router.back()}
        />
        <div className='flex ml-auto gap-2'>
          {isEdit ? (
            <Button text='수정하기' type='tertiary' onClick={modalToggle} />
          ) : (
            <>
              <Button
                text='임시 저장하기'
                type='secondary'
                onClick={() => {
                  handleSaveDraft()
                  router.push('/draft')
                }}
              />
              <Button text='발행하기' type='tertiary' onClick={modalToggle} />
            </>
          )}
        </div>
      </nav>

      {isModalOpen && (
        <ModalConfirm
          title={`${isEdit ? '수정' : '발행'}하시겠습니까?`}
          confirmText={isEdit ? '수정' : '발행'}
          cancelText='취소'
          onConfirm={() => {
            isEdit ? handleEdit() : handlePublish()
            modalToggle()
            router.push('/')
          }}
          onCancel={modalToggle}
        />
      )}
    </>
  )
}
