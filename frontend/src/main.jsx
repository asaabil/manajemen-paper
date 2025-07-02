    import React from 'react';
    import ReactDOM from 'react-dom/client';
    import App from './App';
    import { BrowserRouter } from 'react-router-dom';
    import { AuthProvider } from './context/AuthContext';
    import { PaperProvider } from './context/PaperContext'; // <-- TAMBAHKAN INI

    ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode>
        <AuthProvider>
          {/* BUNGKUS DENGAN PAPERPROVIDER DI SINI */}
          <PaperProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </PaperProvider>
        </AuthProvider>
      </React.StrictMode>,
    );
    