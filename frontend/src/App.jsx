import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from './context/AuthContext';

// Impor komponen dan halaman
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import PapersListPage from './pages/PapersListPage';
import PaperDetailPage from './pages/PaperDetailPage'; // <-- 1. Impor halaman baru
import DosenRoute from './components/DosenRoute'; // <-- Impor penjaga baru
import UploadPaperPage from './pages/UploadPaperPage';

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
          <Route path="/papers/:id" element={<PaperDetailPage />} /> {/* <-- 2. Tambahkan rute baru */}

          {/* Rute Privat */}
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
          
        </Routes>
      </main>
    </div>
  );
}

export default App;
