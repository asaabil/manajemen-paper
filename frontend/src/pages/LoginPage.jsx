import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // <-- 1. Panggil "shortcut" kita

const LoginPage = () => {
  const { login, isAuthenticated } = useAuth(); // <-- 2. Ambil fungsi login & status otentikasi
  const navigate = useNavigate();

  // 3. Jika sudah login, tendang ke halaman utama
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/'); // Arahkan ke HomePage
    }
  }, [isAuthenticated, navigate]);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // 4. Panggil fungsi login dari Context, bukan axios lagi
    login({ email, password });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
