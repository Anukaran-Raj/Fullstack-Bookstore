import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const books = [
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", image: "/great-gatsby.jpg" },
  { title: "To Kill a Mockingbird", author: "Harper Lee", image: "/mocking-bird.jpg" },
  { title: "1984", author: "George Orwell", image: "/1984.png" },
];

const Books = () => {
  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">All Books</h2>
      <Row className="g-4">
        {books.map((book, index) => (
          <Col key={index} md={4}>
            <Card className="shadow-lg h-100">
              <Card.Img variant="top" src={book.image} alt={book.title} />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{book.title}</Card.Title>
                <Card.Text>by {book.author}</Card.Text>
                <Button className="mt-auto">View Details</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Books;
