import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    // Retrieve order history from localStorage
    const orders = JSON.parse(localStorage.getItem('orderHistory')) || [];

    // Sort orders by date (latest first) and get only the last two orders
    const latestOrders = orders.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 2);
    
    setOrderHistory(latestOrders);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  const handleChangePassword = () => {
    navigate('/change-password');
  };

  return (
    <div className="profile-container">
      {/* Side Panel */}
      <div className="side-panel">
        <h3>Menu</h3>
        <ul>
          <li onClick={() => navigate('/profile')}>Profile</li>
          <li onClick={() => navigate('/OrderHistory')}>Orders</li>
          <li onClick={handleChangePassword}>Change Password</li>
          <li onClick={handleLogout} className="logout-item">Logout</li>
        </ul>
      </div>

      {/* Main Profile Content */}
      <div className="profile-content">
        <div className="profile-header">
          <h2>User Profile</h2>
        </div>

        {/* User Info */}
        <div className="profile-details">
          <div>
            <strong>Username:</strong> {user?.username}
          </div>
          <div>
            <strong>Role:</strong> {user?.role}
          </div>
          <div>
            <strong>Email:</strong> {user?.email || "Not provided"}
          </div>
          <div>
            <strong>Joined:</strong> {user?.createdAt || "N/A"}
          </div>
        </div>

        {/* Latest 2 Order History */}
        <div className="order-history">
          <h3>Latest Orders</h3>
          {orderHistory.length > 0 ? (
            <ul>
              {orderHistory.map((order) => (
                <li key={order.id}>
                  <strong>Order ID:</strong> {order.id} - <strong>Date:</strong> {order.date}
                  <ul>
                    {order.items.map((item, index) => (
                      <li key={index}>{item.name} - ${item.price.toFixed(2)}</li>
                    ))}
                  </ul>
                  <strong>Total Amount:</strong> ${order.totalAmount}
                </li>
              ))}
            </ul>
          ) : (
            <p>No recent orders found.</p>
          )}
        </div>

        {/* Logout Button */}
        <div className="logout-wrapper">
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
