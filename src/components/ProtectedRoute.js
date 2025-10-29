import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  try {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!user) return <Navigate to="/auth" replace />;
    return children;
  } catch (err) {
    return <Navigate to="/auth" replace />;
  }
}
