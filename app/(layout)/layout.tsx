import Footer from '../layout/Footer.tsx'
import Header from '../layout/Header.tsx'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
