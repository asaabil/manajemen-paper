import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'
const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  
  const navigate = useNavigate()
  const onLogout = () => {
    logout();
    navigate('/login');
  }
  
  // Tampilan untuk pengguna yang sudah login
  const authLinks = (
    <ul>
      <li><Link to="/papers">Semua Paper</Link></li> {/* <-- LINK BARU */}
      <li><Link to="/dashboard">Dashboard</Link></li>
      {/* Tampilkan link ini HANYA jika user adalah Dosen */}
      {user && user.role === 'Dosen' && (
        <li><Link to="/upload-paper">Unggah Paper</Link></li>
      )}
      <li>
        <span>Halo, {user && user.nama}</span>
      </li>
      <li>
        <button onClick={onLogout}>Logout</button>
      </li>
    </ul>
  )
  // Tampilan untuk tamu (belum login)
  const guestLinks = (
    <ul>
      <li><Link to="/papers">Semua Paper</Link></li> {/* <-- LINK BARU */}
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>
  )
  return (
    <nav>
      <h1>
        <Link to="/">Manajemen Paper</Link>
      </h1>
      {isAuthenticated ? authLinks : guestLinks}
    </nav>
  );
}
export default Navbar;
