import { Suspense } from 'react'

import Loading from '@/loading'

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
