import React, { useState } from 'react';
import axios from 'axios';

const RegisterPage = () => {
  // 1. Siapkan state untuk semua field form
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    password: '',
    password2: '', // State untuk konfirmasi password
    role: 'Mahasiswa', // Nilai default untuk role
  });

  const { nama, email, password, password2, role } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    // 2. Validasi sederhana di frontend
    if (password !== password2) {
      alert('Password tidak cocok!');
      return;
    }

    console.log('Mencoba mendaftar dengan:', formData);

    try {
      // 3. Buat "surat" untuk dikirim (tanpa password2)
      const newUser = {
        nama,
        email,
        password,
        role,
      };
      
      const body = newUser;

      // 4. Kirim ke API backend
      const res = await axios.post('/api/auth/register', body);

      console.log('Registrasi Berhasil! Token:', res.data.token);
      alert('Registrasi Berhasil! Silakan login.');
      
      // Nanti kita akan arahkan ke halaman login
    } catch (err) {
      console.error(err.response.data);
      alert('Registrasi Gagal: ' + err.response.data.msg);
    }
  };

  return (
    <div>
      <h2>Registrasi Akun Baru</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>Nama Lengkap</label>
          <input type="text" name="nama" value={nama} onChange={onChange} required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={email} onChange={onChange} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" value={password} onChange={onChange} required minLength="6" />
        </div>
        <div>
          <label>Konfirmasi Password</label>
          <input type="password" name="password2" value={password2} onChange={onChange} required minLength="6" />
        </div>
        <div>
          <label>Saya mendaftar sebagai:</label>
          <select name="role" value={role} onChange={onChange}>
            <option value="Mahasiswa">Mahasiswa</option>
            <option value="Dosen">Dosen</option>
          </select>
        </div>
        <button type="submit">Daftar</button>
      </form>
    </div>
  );
};

export default RegisterPage;
