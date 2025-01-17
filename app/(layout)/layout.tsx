import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import Inner from '../components/layout/Inner'

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header />
      <main className="relative flex-1 py-40">
        <Inner>{children}</Inner>
      </main>
      <Footer />
    </>
  )
}
