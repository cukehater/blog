import Image from 'next/image'
import Button from '../components/shared/Button'
import Hash from '../components/shared/Hash'
import Editor from '../components/MarkDownEditor'

export default function MarkDownEditor() {
  return (
    <main>
      <div className='flex flex-col min-h-screen'>
        <div className='h-20 bg-gray-700 bg-opacity-5 flex items-center px-4'>
          <Button
            text={
              <>
                <Image
                  src='/assets/images/leave_arrow.svg'
                  alt='나가기'
                  width='24'
                  height='24'
                />
                나가기
              </>
            }
          />
          <div className='flex ml-auto gap-2'>
            <Button text='임시저장' type='secondary' />
            <Button text='출간하기' type='tertiary' />
          </div>
        </div>

        <div className='w-1/2 py-8 px-4'>
          <div>
            <input
              type='text'
              className='w-full text-3xl bg-transparent mb-4'
              placeholder='제목을 입력해 주세요'
            />
          </div>

          <div className='flex gap-2 mt-4 flex-wrap'>
            <Hash hash='해쉬' />
            <Hash hash='해쉬' />
            <Hash hash='해쉬' />

            <input
              type='text'
              className='bg-transparent w-40 block'
              placeholder='태그를 입력해 주세요'
            />
          </div>
        </div>

        <Editor />
      </div>
    </main>
  )
}
