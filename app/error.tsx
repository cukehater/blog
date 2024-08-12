'use client'

import Link from 'next/link'

export default function Error() {
  return (
    <main className='flex-1 flex flex-col items-center justify-center'>
      <h2 className='text-2xl font-bold mb-4'>오류가 발생했습니다</h2>
      <p className='text-gray-600 mb-6'>죄송합니다. 문제가 발생했습니다.</p>

      <Link
        href='/'
        className='px-6 py-3 bg-[var(--accent-color)] text-[--background-color] font-semibold rounded-lg'
      >
        홈으로 돌아가기
      </Link>
    </main>
  )
}
