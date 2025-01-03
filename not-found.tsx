import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* 404 숫자 */}
        <h1 className="text-9xl font-bold text-gray-200">404</h1>

        {/* 아이콘 */}
        <div className="mb-8 text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-24 w-24 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* 메시지 */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          페이지를 찾을 수 없습니다
        </h2>
        <p className="text-gray-600 mb-8">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>

        {/* 네비게이션 버튼들 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            홈으로 이동
          </Link>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            이전 페이지로
          </button>
        </div>

        {/* 추가 도움말 */}
        <div className="mt-12 text-sm text-gray-500">
          <p>도움이 필요하신가요?</p>
          <Link
            href="/contact"
            className="text-blue-500 hover:text-blue-600 underline"
          >
            고객센터 문의하기
          </Link>
        </div>
      </div>
    </div>
  )
}
