// 1. Impor library
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors'); // <-- Impor cors
const path = require('path'); // <-- [+] Impor path

// 2. Load semua variabel dari file .env
dotenv.config();

// 3. Bikin aplikasi Express
const app = express();
const PORT = 5000;

// --- GUNAKAN CORS DI SINI ---
app.use(cors()); // <-- Izinkan semua permintaan dari domain lain

// Middleware untuk membaca JSON dari body request
app.use(express.json());

// [+] Sajikan file statis dari folder 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Hubungkan rute auth kita
app.use('/api/auth', require('./routes/auth'));

// Hubungkan rute untuk paper
app.use('/api/papers', require('./routes/papers'));

// 4. Proses Koneksi ke Database
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Mantap! Berhasil terhubung ke MongoDB Atlas.');
    // Jalankan server HANYA SETELAH database berhasil terhubung
    app.listen(PORT, () => {
      console.log(`Server berjalan di port http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Waduh, gagal konek ke database:', err);
  });


// 5. Bikin "rute" atau "alamat" pertama kita
app.get('/', (req, res) => {
  res.send('Hello World! Server backend kita udah nyala, Sa!');
});