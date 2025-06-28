import Navbar from './Navbar'
import Head from 'next/head'
import { useState, useEffect } from 'react'

const Layout = ({ children }) => {
  const [theme, setTheme] = useState('dark') // Default to dark

  useEffect(() => {
    // Load theme from localStorage on mount
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  useEffect(() => {
    // Apply theme to html tag and save to localStorage
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'))
  }

  return (
    <>
      <Head>
        <title>My Portfolio Blog</title>
        <meta name="description" content="A portfolio and blog site showcasing my projects and learning journey." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main className="container mt-4">
        {children}
      </main>
      <footer className="text-center py-4 mt-5" style={{ borderTop: '1px solid var(--border-color)', color: 'var(--text-muted-color)' }}>
        <p>&copy; {new Date().getFullYear()} My Portfolio Blog. All rights reserved.</p>
      </footer>
    </>
  )
}

export default Layout
