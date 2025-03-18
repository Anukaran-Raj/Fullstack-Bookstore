import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Get token from localStorage

  return token ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
