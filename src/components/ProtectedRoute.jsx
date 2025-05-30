import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Spin } from 'antd';

export default function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  // Log authentication state for debugging
  console.log('ProtectedRoute - Auth State:', { currentUser, loading });

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!currentUser) {
    console.log('ProtectedRoute - Redirecting to login');
    // Redirect to login page with return url
    return <Navigate to="/" state={{ from: location.pathname }} replace />;
  }

  return children;
}