import Footer from '../layout/footer/Footer.tsx'
import Header from '../layout/header/Header.tsx'

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
