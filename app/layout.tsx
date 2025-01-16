import { Metadata } from 'next'

import SWRConfigContext from './context/SWRConfigContext'
import './styles/globals.scss'
import { getBlogTitle } from './services/profile'

export async function generateMetadata(): Promise<Metadata> {
  const blogTitleData = await getBlogTitle()

  return {
    title: blogTitleData?.blogTitle,
    description: `${blogTitleData?.blogTitle}의 기술 블로그`
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body
        className="bg-[--primary-color] flex min-h-screen flex-col"
        suppressHydrationWarning
      >
        <div id="portal" />
        <SWRConfigContext>{children}</SWRConfigContext>
      </body>
    </html>
  )
}
