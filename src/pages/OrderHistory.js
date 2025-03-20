import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OrderHistory.css";

const OrderHistory = ({ ordersData }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (ordersData) {
      setOrders(ordersData); // Use data passed as prop
    } else {
      // Retrieve from localStorage if no prop is provided
      const storedOrders = JSON.parse(localStorage.getItem("orderHistory")) || [];
      setOrders(storedOrders);
    }
  }, [ordersData]);

  const navigate = useNavigate();

  return (
    <div className="order-history-container">
      <h2 className="order-history-heading">Order History</h2>

      {orders.length === 0 ? (
        <p className="empty-orders">No past orders found.</p>
      ) : (
        <ul className="order-list">
          {orders.map((order) => (
            <li key={order.id} className="order-item">
              <h3>Order ID: {order.id}</h3>
              <p>Date: {order.date}</p>
              <p>Total Amount: ${order.totalAmount}</p>
              <ul className="order-items">
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.title} - ${item.price}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}

      <button className="back-btn" onClick={() => navigate("/")}>
        Back to Home
      </button>
    </div>
  );
};

export default OrderHistory;
