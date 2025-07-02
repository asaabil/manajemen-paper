import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Komponen ini membungkus komponen lain (children)
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // Jika masih loading (masih ngecek token), jangan render apa-apa dulu
  // Ini PENTING untuk mencegah "kedipan" ke halaman login saat refresh
  if (loading) {
    return <div>Loading...</div>; // Atau tampilkan spinner
  }

  // Jika sudah tidak loading DAN tidak terotentikasi, tendang ke halaman login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Jika semua aman (tidak loading & terotentikasi), tampilkan halaman yang dituju
  return children;
};

export default PrivateRoute;
