    import React from 'react';
    import { Navigate } from 'react-router-dom';
    import { useAuth } from '../context/AuthContext';

    const DosenRoute = ({ children }) => {
      const { isAuthenticated, user, loading } = useAuth();

      if (loading) {
        return <div>Loading...</div>;
      }

      // [*] Tambahkan pengecekan 'user' di sini
      if (isAuthenticated && user && user.role === 'Dosen') {
        return children;
      }

      return <Navigate to="/" />;
    };

    export default DosenRoute;
    