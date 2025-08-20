    import React from 'react';
    import ReactDOM from 'react-dom/client';
    import App from './App';
    import './index.css'; // <-- TAMBAHKAN INI
    import { BrowserRouter } from 'react-router-dom';
    import { AuthProvider } from './context/AuthContext';
    import { PaperProvider } from './context/PaperContext';

    ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode>
        <AuthProvider>
          <PaperProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </PaperProvider>
        </AuthProvider>
      </React.StrictMode>,
    );
    