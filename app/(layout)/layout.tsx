import Footer from '../components/layouts/footer/Footer.tsx'
import Header from '../components/layouts/header/Header.tsx'

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
