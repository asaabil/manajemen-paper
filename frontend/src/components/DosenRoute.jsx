import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DosenRoute = ({ children }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  // Jika sudah login DAN perannya adalah Dosen
  if (isAuthenticated && user.role === 'Dosen') {
    return children; // Izinkan masuk
  }

  // Jika tidak, tendang ke halaman utama
  return <Navigate to="/" />;
};

export default DosenRoute;