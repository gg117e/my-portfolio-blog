import { Navbar, Nav, Container, Button } from 'react-bootstrap'
import Link from 'next/link'

const MyNavbar = ({ theme, toggleTheme }) => {
  return (
    <Navbar bg={theme === 'dark' ? 'dark' : 'light'} variant={theme} expand="lg">
      <Container>
        <Navbar.Brand as={Link} href="/">My Portfolio Blog</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} href="/">Home</Nav.Link>
            <Nav.Link as={Link} href="/blog">Blog</Nav.Link>
            <Nav.Link as={Link} href="/portfolio">Portfolio</Nav.Link>
            <Nav.Link as={Link} href="/about">About</Nav.Link>
            <Nav.Link as={Link} href="/books">Reading List</Nav.Link>
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
