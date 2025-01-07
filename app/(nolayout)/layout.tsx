import Loading from '@/loading'
import { Suspense } from 'react'

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="flex-1">
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </main>
  )
}
