import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../store/cartSlice";
import "./Payment.css"; // Modern Dark Theme Styling

const FakePayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get cart data from navigation state
  const { cartItems, totalAmount } = location.state || {};

  // Handle Payment Submission
  const handlePayment = () => {
    if (!cartItems || cartItems.length === 0) {
      alert("No items to process!");
      navigate("/cart");
      return;
    }

    // Retrieve existing order history
    const orderHistory = JSON.parse(localStorage.getItem("orderHistory")) || [];

    // Create a new order
    const newOrder = {
      id: new Date().getTime(), // Unique order ID
      date: new Date().toLocaleString(),
      items: cartItems,
      totalAmount: totalAmount.toFixed(2),
    };

    // Save new order to localStorage
    orderHistory.push(newOrder);
    localStorage.setItem("orderHistory", JSON.stringify(orderHistory));

    // Clear the cart after successful payment
    dispatch(clearCart());

    alert("Payment successful! Your order has been placed.");

    // Redirect to Order History page
    navigate("/OrderHistory");
  };

  return (
    <div className="payment-container">
      <div className="payment-box">
        <h2 className="payment-heading">Payment Details</h2>
        <div className="payment-form">
          <label>Card Number:</label>
          <input type="text" placeholder="**** **** **** ****" readOnly />

          <label>Expiry Date:</label>
          <input type="text" placeholder="MM/YY" readOnly />

          <label>CVV:</label>
          <input type="password" placeholder="***" readOnly />
        </div>

        <h4 className="payment-amount">Total Amount: ${totalAmount?.toFixed(2)}</h4>

        <button className="confirm-payment-btn" onClick={handlePayment}>
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default FakePayment;
