import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4">
      <Container>
        <Row>
          <Col md={6}>
            <h5>Book Store</h5>
            <p>Your one-stop destination for amazing books.</p>
          </Col>
          <Col md={3}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/all-books" className="text-white text-decoration-none">All Books</a></li>
              <li><a href="/about" className="text-white text-decoration-none">About Us</a></li>
              <li><a href="/contact" className="text-white text-decoration-none">Contact</a></li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>Contact Us</h5>
            <p>Email: support@bookstore.com</p>
            <p>Phone: +123 456 7890</p>
          </Col>
        </Row>
        <hr />
        <p className="text-center">© 2025 Book Haven. All Rights Reserved.</p>
      </Container>
    </footer>
  );
};

export default Footer;
