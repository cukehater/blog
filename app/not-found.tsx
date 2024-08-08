import Link from 'next/link'

export default function Page() {
  return (
    <main className='flex mt-0 flex-col items-center justify-center'>
      <h1 className='text-7xl font-bold text-[var(--border-color)] mb-4'>
        404
      </h1>
      <p className='text-xl text-gray-600 mb-10'>페이지를 찾을 수 없습니다</p>
      <Link
        href='/'
        className='px-6 py-3 bg-[var(--accent-color)] text-[--background-color] font-semibold rounded-lg'
      >
        홈으로 돌아가기
      </Link>
    </main>
  )
}
