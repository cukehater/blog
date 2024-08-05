import { useRouter } from 'next/navigation'

import Button from '@/app/shared/components/Button'
import { ArrowSvg } from '@/app/shared/components/svg/ArrowSvg'

export default function TopNav({
  handleSaveDraft,
  handlePublish
}: {
  handleSaveDraft: () => void
  handlePublish: () => void
}) {
  const router = useRouter()

  return (
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
        <Button text='발행하기' type='tertiary' onClick={handlePublish} />
      </div>
    </nav>
  )
}
