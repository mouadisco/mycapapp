import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Login from './Login';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-large"></div>
        <p>Chargement...</p>
      </div>
    );
  }

  if (!isAuthenticated()) {
    return <Login />;
  }

  return children;
};

export default ProtectedRoute;
