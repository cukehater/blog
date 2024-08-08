import type { Metadata } from 'next'

import { Inter } from 'next/font/google'

import './globals.scss'
import Footer from './layout/Footer'
import Header from './layout/Header'
import { cookies } from 'next/headers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const mode = cookies().get('mode')

  return (
    <html lang='ko' className={mode?.value === 'light' ? '' : 'dark-mode'}>
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
