import Inner from '../components/layout/Inner'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header />
      <main className="flex-1 pt-40 pb-20">
        <Inner>{children}</Inner>
      </main>
      <Footer />
    </>
  )
}
