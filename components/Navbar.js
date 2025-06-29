import { Navbar, Nav, Container, Button } from 'react-bootstrap'
import Link from 'next/link'
import { useRouter } from 'next/router'

const MyNavbar = ({ theme, toggleTheme }) => {
  const router = useRouter()

  return (
    <Navbar bg={theme === 'dark' ? 'dark' : 'light'} variant={theme} expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} href="/">My Portfolio Blog</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} href="/" className={router.pathname === '/' ? 'active' : ''}>Home</Nav.Link>
            <Nav.Link as={Link} href="/blog" className={router.pathname.startsWith('/blog') || router.pathname.startsWith('/posts') ? 'active' : ''}>Blog</Nav.Link>
            <Nav.Link as={Link} href="/portfolio" className={router.pathname === '/portfolio' ? 'active' : ''}>Portfolio</Nav.Link>
            <Nav.Link as={Link} href="/about" className={router.pathname === '/about' ? 'active' : ''}>About</Nav.Link>
            <Nav.Link as={Link} href="/books" className={router.pathname === '/books' ? 'active' : ''}>Reading List</Nav.Link>
          </Nav>
          <Button variant={theme === 'dark' ? 'outline-light' : 'outline-dark'} onClick={toggleTheme}>
            {theme === 'dark' ? 'ライトモード' : 'ダークモード'}
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default MyNavbar