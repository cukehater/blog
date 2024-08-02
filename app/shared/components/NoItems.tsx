'use client'

import Lottie from 'lottie-react'
import loadingLottie from '@/public/assets/lottie/loading.json'

export default function NoItems({ text }: { text: string }) {
  return (
    <section className='flex-1 flex flex-col items-center justify-center'>
      <div className='w-16 mx-auto'>
        <Lottie animationData={loadingLottie} />
      </div>
      <p className='text-center text-gray-500 mt-5'>등록된 {text} 없습니다.</p>
    </section>
  )
}
