// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // ✅ Correct hook import

const PrivateRoute = ({ children }) => {
  const { authData } = useAuth(); // ✅ Use the context hook

  if (!authData) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
