"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Navbar, Nav, Container, NavLink } from 'react-bootstrap';




export default function Navigation() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);
  const [setLogin, setIsLogin] = useState(false);
  const [setRegister, setIsRegister] = useState(false);
  const [setHome, setIsHome] = useState(false);

  const styleLogin = {
    textDecoration: 'none',
    color: setLogin ? '#90EE90' : 'white', // Change color on hover
  };
  
  const styleRegister = {
    textDecoration: 'none',
    color: setRegister ? '#90EE90' : 'white', // Change color on hover
  };
  
  const styleHome = {
    fontSize: '1.5rem',
    textDecoration: 'none',
    color: setHome ? '#90EE90' : 'white', // Change color on hover
  };

  return (
    <Navbar expanded={expanded} expand="lg" sticky="top" className="bg-emerald-800">
      <Container>
        <Navbar.Brand as={Link} href="/" style={styleHome}
              onMouseEnter={() => setIsHome(true)}
              onMouseLeave={() => setIsHome(false)}>
          Support Worker
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")} />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} href="/login" active={pathname === '/login'} onClick={() => setExpanded(false)}
            style={styleLogin}  
            onMouseEnter={() => setIsLogin(true)}
            onMouseLeave={() => setIsLogin(false)}>
              Login
            </Nav.Link>
            <Nav.Link as={Link} href="/registeruser" active={pathname === '/registeruser'} onClick={() => setExpanded(false)}
              style={styleRegister}
              onMouseEnter={() => setIsRegister(true)}
              onMouseLeave={() => setIsRegister(false)}>
              Register
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
