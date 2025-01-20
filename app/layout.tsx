import { Metadata } from 'next'

import SWRConfigContext from './context/SWRConfigContext'
import './styles/globals.scss'
import { getBlogTitle } from './services/profile'

type BlogTitleType = {
  blogTitle: string
  description: string
}

export async function generateMetadata(): Promise<Metadata> {
  const blogTitleData = await getBlogTitle()
  const { blogTitle, description } = blogTitleData as unknown as BlogTitleType

  return {
    title: {
      template: `%s | ${blogTitle} 기술 블로그`,
      default: `${blogTitle} 기술 블로그`
    },
    description,
    icons: {
      icon: '/favicon.ico'
    },
    openGraph: {
      title: `${blogTitle} 기술 블로그`,
      description,
      siteName: `${blogTitle} 기술 블로그`,
      locale: 'ko_KR',
      type: 'website',
      url: 'https://blog-nine-beige-27.vercel.app/',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630
        }
      ]
    }
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <head>
        <meta
          name="google-site-verification"
          content="ZSBCOBhbZHQGU_NOJ_A1fsoGlblAoyOBMd5rGmOHe24"
        />
      </head>
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
