import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  const handleChangePassword = () => {
    navigate('/change-password'); // ✅ Navigate to change password page
  };

  return (
    <div className="profile-container">
      {/* Side Panel */}
      <div className="side-panel">
        <h3>Menu</h3>
        <ul>
          <li onClick={() => navigate('/profile')}>Profile</li>
          <li onClick={() => navigate('/orders')}>Orders</li>
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

        {/* Order History */}
        <div className="order-history">
          <h3>Your Orders</h3>
          <ul>
            <li>Order #1234 - "React for Beginners" - $25.99</li>
            <li>Order #1235 - "Advanced JavaScript" - $30.99</li>
            <li>Order #1236 - "Machine Learning Essentials" - $45.00</li>
          </ul>
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
