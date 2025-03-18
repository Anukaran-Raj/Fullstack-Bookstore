import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useContext(AuthContext);

  // If user is not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If user role is not allowed, redirect to home
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
