import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/znmd" />; // Redirect to login page if not authenticated
  }

  return children; // Render children (protected components) if authenticated
};

export default ProtectedRoute;
