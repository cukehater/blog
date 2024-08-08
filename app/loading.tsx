export default function Loading() {
  return (
    <main className='flex-1 flex items-center justify-center'>
      <div className='w-72'>
        <div className='flex justify-center items-center'>
          <div className='animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[var(--color)]'></div>
        </div>
        <p className='text-center mt-4 text-[var(--color)]'>Loading...</p>
      </div>
    </main>
  )
}
