import React from 'react';
import { useAuth } from '../context/AuthContext';

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <div>
      <h2>Dashboard</h2>
      {user && (
        <>
          <p>Selamat datang kembali, {user.nama}!</p>
          <p>Email: {user.email}</p>
          <p>Peran Anda: {user.role}</p>
        </>
      )}
    </div>
  );
};

export default DashboardPage;