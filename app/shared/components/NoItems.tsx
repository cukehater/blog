'use client'

import Lottie from 'lottie-react'

import loadingLottie from '@/public/assets/lottie/loading.json'

export default function NoItems() {
  return (
    <section className='flex-1 flex flex-col items-center justify-center'>
      <div className='w-16 mx-auto'>
        <Lottie animationData={loadingLottie} />
      </div>
      <p className='text-center text-gray-500 mt-5'>
        등록된 게시물이 존재하지 않습니다.
      </p>
    </section>
  )
}
