import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from './context/AuthContext';

// Impor komponen dan halaman
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import DosenRoute from './components/DosenRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import PapersListPage from './pages/PapersListPage';
import PaperDetailPage from './pages/PaperDetailPage';
import UploadPaperPage from './pages/UploadPaperPage';
import EditPaperPage from './pages/EditPaperPage'; // <-- 1. TAMBAHKAN IMPOR INI

function App() {
  const { loadUser } = useAuth();

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div>
      <Navbar />
      <hr />
      <main>
        <Routes>
          {/* Rute Publik */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/papers" element={<PapersListPage />} />
          <Route path="/papers/:id" element={<PaperDetailPage />} />

          {/* Rute Privat Umum */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />

          {/* Rute Privat Khusus Dosen */}
          <Route 
            path="/upload-paper" 
            element={<DosenRoute><UploadPaperPage /></DosenRoute>} 
          />
          {/* 2. TAMBAHKAN RUTE BARU DI BAWAH INI */}
          <Route 
            path="/papers/:id/edit" 
            element={<DosenRoute><EditPaperPage /></DosenRoute>} 
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
