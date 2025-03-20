import React, { useContext, useState } from 'react';
import { Container, Nav, Navbar, Image, Dropdown, Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import './NavbarBook.css';

const NavbarBook = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [sellerDropdown, setSellerDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const getUserInitials = (name) => {
    return name
      ? name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
      : '';
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/book?search=${searchQuery}`);
    }
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary px-3" bg="dark" data-bs-theme="dark">
      <Container fluid>
        {/* Logo */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <Image src="/books.png" alt="Book Store Logo" width="40" height="40" className="me-2" />
          Book Store
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="ms-auto my-2 my-lg-0" navbarScroll>
            {/* Welcome Message */}
            {user && <Nav.Link className="welcome-message">Welcome, {user.username}</Nav.Link>}

            {/* Public Links */}
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About Us</Nav.Link>
            <Nav.Link as={Link} to="/book">All Books</Nav.Link>

            {/* Buyer-Specific Links */}
            {user?.role === 'buyer' && (
              <>
                {/* Search Bar */}
                <Form className="d-flex me-3" onSubmit={handleSearch}>
                  <Form.Control
                    type="search"
                    placeholder="Search books..."
                    className="me-2"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button type="submit" variant="outline-light">Search</Button>
                </Form>

                {/* Cart Icon */}
                <Nav.Link as={Link} to="/cart" className="me-3">
                  <FaShoppingCart size={20} />
                </Nav.Link>
              </>
            )}

            {/* Seller-Specific Links */}
            {user?.role === 'seller' && (
              <Dropdown
                show={sellerDropdown}
                onToggle={(isOpen) => setSellerDropdown(isOpen)}
                className="ms-2 custom-dropdown"
                align="end"
              >
                <div onClick={() => setSellerDropdown(!sellerDropdown)} className="seller-dropdown-trigger">
                  Seller Panel
                </div>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/OrderHistory">Orders</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/AddBook">Add Book</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}

            {/* Profile Dropdown */}
            {user && (
              <Dropdown
                show={show}
                onToggle={(isOpen) => setShow(isOpen)}
                className="ms-2 custom-dropdown"
                align="end"
              >
                <div onClick={() => setShow(!show)} className="profile-icon">
                  {getUserInitials(user.username)}
                </div>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout} style={{ color: 'red' }}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}

            {/* Auth Buttons */}
            {!user && (
              <>
                <Button variant="outline-light" as={Link} to="/login" className="me-2">Login</Button>
                <Button variant="primary" as={Link} to="/register">Signup</Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarBook;
