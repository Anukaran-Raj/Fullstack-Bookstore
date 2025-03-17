import React from 'react';
import { Button, Container, Nav, Navbar, Image } from 'react-bootstrap';

const NavbarBook = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary px-3" bg="dark" data-bs-theme="dark">
      <Container fluid>
        
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <Image 
            src="/books.png" 
            alt="Book Store Logo" 
            width="40" 
            height="40" 
            className="me-2"
          />
          Book Store
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
        
          <Nav className="ms-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About Us</Nav.Link>
            <Nav.Link href="/books">All Books</Nav.Link>
          </Nav>

          {/* Auth Buttons */}
          <div className="ms-3">
            <Button variant="outline-light" href="/login" className="me-2">Login</Button>
            <Button variant="primary" href="/signup">Signup</Button>
          </div>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarBook;
