import React, { createContext, useReducer, useContext } from 'react';
import axios from 'axios';
import { authReducer } from './authReducer';
import setAuthToken from '../utils/setAuthToken';

const AuthContext = createContext();

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Fungsi ini sekarang HANYA untuk reload halaman
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get('/api/auth');
      dispatch({ type: 'USER_LOADED', payload: res.data });
    } catch (err) {
      dispatch({ type: 'AUTH_ERROR' });
    }
  };
  
  // --- STRATEGI BARU DI SINI ---
  const register = async (formData) => {
    try {
      // 1. Dapatkan token dari backend
      const res = await axios.post('/api/auth/register', formData);
      const token = res.data.token;

      // 2. Langsung pasang token ke header axios untuk request selanjutnya
      setAuthToken(token);

      // 3. Sekarang, ambil data user lengkap dengan token yang BARU
      const userRes = await axios.get('/api/auth');

      // 4. BARU dispatch semuanya sekaligus: token & data user
      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: { token, user: userRes.data },
      });
    } catch (err) {
      dispatch({ type: 'REGISTER_FAIL' });
      alert(err.response.data.msg);
    }
  };
  
  // --- DAN STRATEGI BARU DI SINI ---
  const login = async (formData) => {
    try {
      // 1. Dapatkan token dari backend
      const res = await axios.post('/api/auth/login', formData);
      const token = res.data.token;

      // 2. Langsung pasang token ke header axios untuk request selanjutnya
      setAuthToken(token);

      // 3. Sekarang, ambil data user lengkap dengan token yang BARU
      const userRes = await axios.get('/api/auth');

      // 4. BARU dispatch semuanya sekaligus: token & data user
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { token, user: userRes.data },
      });
    } catch (err) {
      dispatch({ type: 'LOGIN_FAIL' });
      alert(err.response.data.msg);
    }
  };

  const logout = () => {
    setAuthToken(null);
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, loadUser, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
