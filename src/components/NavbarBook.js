import React from 'react';
import { Button, Container, Nav, Navbar, Image } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const NavbarBook = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Check if user is logged in
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    localStorage.removeItem('user');  // Remove user details
    navigate('/login'); // Redirect to login page
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary px-3" bg="dark" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <Image src="/books.png" alt="Book Store Logo" width="40" height="40" className="me-2" />
          Book Store
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="ms-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About Us</Nav.Link>
            <Nav.Link as={Link} to="/book">All Books</Nav.Link>
          </Nav>

          <div className="ms-3">
            {token ? (
              <>
                <Nav.Link as={Link} to="/profile" className="text-light me-3">Profile</Nav.Link>
                <span className="text-light me-3">Welcome, {user?.name || "User"}</span>
                <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <>
                <Button variant="outline-light" as={Link} to="/login" className="me-2">Login</Button>
                <Button variant="primary" as={Link} to="/Register">Signup</Button>
              </>
            )}

          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarBook;
