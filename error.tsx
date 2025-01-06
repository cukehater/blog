'use client'

import { useEffect } from 'react'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // 에러를 로깅하는 서비스로 전송할 수 있습니다
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
          {/* 에러 아이콘 */}
          <div className="mb-4 text-red-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          {/* 에러 메시지 */}
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            문제가 발생했습니다
          </h2>
          <p className="text-gray-600 text-center mb-6">
            {error.message || '예기치 않은 오류가 발생했습니다.'}
          </p>

          {/* 작업 버튼들 */}
          <div className="flex gap-4">
            <button
              onClick={reset}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              다시 시도
            </button>
            <button
              onClick={() => (window.location.href = '/')}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              홈으로 이동
            </button>
          </div>
        </div>

        {/* 에러 코드 표시 (개발 환경에서만) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-6 p-4 bg-gray-100 rounded-md">
            <p className="text-sm font-mono text-gray-600">
              {error.digest && `Error digest: ${error.digest}`}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
