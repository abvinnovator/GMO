import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute: React.FC = () => {

  const isAuthenticated = localStorage.getItem('userDetails') !== null;

  if (!isAuthenticated) {
    return <Navigate to="/" replace state={{ showAlert: true }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;