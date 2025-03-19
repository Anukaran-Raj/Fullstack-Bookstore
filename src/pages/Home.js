import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import Footer from "../components/Footer";
import "./Home.css";

const books = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    image: "/great-gatsby.jpg", 
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    image: "/mocking-bird.jpg",
  },
  {
    title: "1984",
    author: "George Orwell",
    image: "/1984.png",
  },
];

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <header className="hero">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <div className="hero-content">
                <h1>Discover Your Next Great Read</h1>
                <p>
                  Uncover captivating stories, enriching knowledge, and endless
                  inspiration in our curated collection of books.
                </p>
                <Button id="hero-button" href="#discover">
                  Discover Books
                </Button>
              </div>
            </Col>
            <Col md={6} className="hero-image">
              <img src="/store.avif" alt="Books Illustration" />
            </Col>
          </Row>
        </Container>
      </header>

      {/* Recently Added Books Section */}
      <Container className="my-5 recently-added-container">
        <h2 className="recently-added-heading">Recently Added Books</h2>
        <Row className="g-4">
          {books.map((book, index) => (
            <Col key={index} md={4}>
              <Card className="shadow-lg h-100">
                <Card.Img
                  variant="top"
                  src={book.image}
                  alt={book.title}
                  className="card-img-top"
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title style={{ color: "white" }}>
                    {book.title}
                  </Card.Title>
                  <Card.Text>by {book.author}</Card.Text>
                  <Button className="mt-auto">View Details</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Home;
