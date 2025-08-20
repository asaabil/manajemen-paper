    import React from 'react';
    import { Link, useNavigate } from 'react-router-dom';
    import { useAuth } from '../context/AuthContext';
    import { Button } from '@/components/ui/button'; // <-- Pastikan Button diimpor

    const Navbar = () => {
      const { isAuthenticated, user, logout } = useAuth();
      const navigate = useNavigate();

      const onLogout = () => {
        logout();
        navigate('/login');
      };

      // Tampilan untuk pengguna yang sudah login
      const authLinks = (
        <div className="flex items-center gap-4"> {/* Menggunakan div dengan flex */}
          <Button asChild variant="ghost">
            <Link to="/papers">Semua Paper</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link to="/dashboard">Dashboard</Link>
          </Button>
          
          {user && user.role === 'Dosen' && (
            <Button asChild variant="ghost">
              <Link to="/upload-paper">Unggah Paper</Link>
            </Button>
          )}

          <span className="text-sm text-slate-500">Halo, {user && user.nama}</span>
          <Button onClick={onLogout} variant="outline" size="sm">Logout</Button>
        </div>
      );

      // Tampilan untuk tamu (belum login)
      const guestLinks = (
        <div className="flex items-center gap-4"> {/* Menggunakan div dengan flex */}
          <Button asChild variant="ghost">
            <Link to="/papers">Semua Paper</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link to="/register">Register</Link>
          </Button>
          <Button asChild>
            <Link to="/login">Login</Link>
          </Button>
        </div>
      );

      return (
        <header className="bg-background/95 sticky top-0 z-50 w-full border-b border-border/40 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <nav className="container flex h-14 max-w-screen-2xl items-center justify-between">
            <Link to="/" className="text-lg font-bold">
              PaperFlow
            </Link>
            
            {isAuthenticated ? authLinks : guestLinks}
          </nav>
        </header>
      );
    };

    export default Navbar;
    