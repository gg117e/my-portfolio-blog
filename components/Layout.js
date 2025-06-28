import Navbar from './Navbar'
import Head from 'next/head'

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>My Portfolio Blog</title>
        <meta name="description" content="A portfolio and blog site showcasing my projects and learning journey." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="container mt-4">
        {children}
      </main>
      <footer className="text-center py-4 mt-5" style={{ borderTop: '1px solid #333', color: '#888' }}>
        <p>&copy; {new Date().getFullYear()} My Portfolio Blog. All rights reserved.</p>
      </footer>
    </>
  )
}

export default Layout
