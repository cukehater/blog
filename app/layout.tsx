import { SpeedInsights } from '@vercel/speed-insights/next'
import { Metadata } from 'next'

import { DOMAIN } from '@/config'

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
      url: DOMAIN,
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
        <meta
          name="naver-site-verification"
          content="a14c46934e5b2876fdf1fea543c68bd908f15a7e"
        />
      </head>
      <body
        className="bg-[--primary-color] flex min-h-screen flex-col"
        suppressHydrationWarning
      >
        <div id="portal" />
        <SWRConfigContext>{children}</SWRConfigContext>
        <SpeedInsights />
      </body>
    </html>
  )
}
