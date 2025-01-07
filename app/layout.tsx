import SWRConfigContext from './context/SWRConfigContext'

import './styles/globals.scss'

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
