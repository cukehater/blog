import { useReducer } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import Button from '@/app/shared/components/Button.tsx'
import ModalConfirm from '@/app/shared/components/ModalConfirm.tsx'
import ArrowSvg from '@/app/shared/components/svg/ArrowSvg.tsx'

export default function TopNav({
  handleSave,
  handlePublish
}: {
  handleSave: () => void
  handlePublish: () => void
}) {
  const router = useRouter()
  const searchParamsDraft = useSearchParams().get('draft')
  const isDraft = searchParamsDraft === 'true'
  const [isModalOpen, modalToggle] = useReducer((prev) => !prev, false)

  return (
    <>
      <nav className="h-20 bg-[var(--border-color)]  flex items-center px-4">
        <Button
          text={
            <>
              <ArrowSvg className="w-6 h-6" />
              돌아가기
            </>
          }
          onClick={() => router.back()}
        />
        <div className="flex ml-auto gap-2">
          {isDraft || searchParamsDraft === null ? (
            <>
              <Button
                text="임시 저장하기"
                type="secondary"
                onClick={() => {
                  handleSave()
                  router.push('/draft')
                }}
              />
              <Button text="발행하기" type="tertiary" onClick={modalToggle} />
            </>
          ) : (
            <Button text="수정하기" type="tertiary" onClick={modalToggle} />
          )}
        </div>
      </nav>

      {isModalOpen && (
        <ModalConfirm
          title={`${isDraft || searchParamsDraft === null ? '발행' : '수정'} 하시겠습니까?`}
          confirmText="확인"
          cancelText="취소"
          onConfirm={() => {
            if (isDraft || searchParamsDraft === null) {
              handlePublish()
            } else {
              handleSave()
            }
            modalToggle()
            router.push('/')
          }}
          onCancel={modalToggle}
        />
      )}
    </>
  )
}
