'use client'

import Lottie from 'lottie-react'

import spinner from '@/public/assets/lottie/spinner.json'

export default function Loading() {
  return (
    <main className='flex-1 flex items-center justify-center'>
      <div className='w-80'>
        <Lottie animationData={spinner} />
      </div>
    </main>
  )
}
