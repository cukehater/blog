import { useReducer } from 'react'

import { useRouter } from 'next/navigation'

import Button from '@/app/shared/components/Button'
import ModalConfirm from '@/app/shared/components/ModalConfirm'
import { ArrowSvg } from '@/app/shared/components/svg/ArrowSvg'

export default function TopNav({
  handleSaveDraft,
  handlePublish
}: {
  handleSaveDraft: () => void
  handlePublish: () => void
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
          <Button
            text='임시저장'
            type='secondary'
            onClick={() => {
              handleSaveDraft()
              router.push('/draft')
            }}
          />
          <Button text='발행하기' type='tertiary' onClick={modalToggle} />
        </div>
      </nav>

      {isModalOpen && (
        <ModalConfirm
          title='게시물을 발행하시겠습니까?'
          confirmText='발행'
          cancelText='취소'
          onConfirm={() => {
            handlePublish()
            modalToggle()
          }}
          onCancel={modalToggle}
        />
      )}
    </>
  )
}
