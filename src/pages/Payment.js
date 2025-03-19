import React, { useState } from "react";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import "./Payment.css";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { cartItems, totalAmount } = location.state || {};

  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardHolder, setCardHolder] = useState("");

  const handlePayment = (e) => {
    e.preventDefault();
    alert("Payment Successful!");
    navigate("/"); // Redirect to home page after payment
  };

  return (
    <Container className="payment-container">
      <Card className="payment-card">
        <Card.Body>
          <h2 className="text-center mb-4">Payment</h2>

          {/* Order Summary */}
          <div className="order-summary">
            <h5>Order Summary</h5>
            {cartItems?.map((item, index) => (
              <div key={index} className="d-flex justify-content-between mb-2">
                <span>{item.title}</span>
                <span>${item.price}</span>
              </div>
            ))}
            <div className="d-flex justify-content-between fw-bold">
              <span>Total:</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Form */}
          <Form onSubmit={handlePayment} className="mt-4">
            <Form.Group className="mb-3">
              <Form.Label>Card Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Expiry Date</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="MM/YY"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>CVV</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="123"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Card Holder's Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="John Doe"
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="success" type="submit" className="w-100 mt-3">
              Pay ${totalAmount.toFixed(2)}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Payment;
