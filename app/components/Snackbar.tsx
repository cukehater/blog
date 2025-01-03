'use client'

export default function Snackbar({
  message,
  type
}: {
  message: string
  type: 'success' | 'error'
}) {
  return (
    <div
      className={`fixed top-24 right-4 color-white font-semibold rounded-md px-4 py-3 flex items-center gap-2 z-[99999] ${
        type === 'success' ? 'bg-green-500' : 'bg-red-600'
      } `}
    >
      <p>{message}</p>
      {type === 'success' ? '✅' : '🚨'}
    </div>
  )
}
