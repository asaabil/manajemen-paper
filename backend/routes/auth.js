const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Impor User model yang udah kita buat
const User = require('../models/User');
const auth = require('../middleware/auth'); // <-- PENTING: Pastikan baris ini ada

// @route   GET api/auth
// @desc    Dapatkan data user yang sedang login
// @access  Private
router.get('/', auth, async (req, res) => { // <-- PENTING: Pastikan ada 'auth' di sini
  try {
    // Kita bisa pake req.user.id karena udah "ditempel" sama middleware auth
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route   POST api/auth/register
// @desc    Mendaftarkan user baru
// @access  Public
router.post('/register', async (req, res) => {
  // 1. Ambil data dari body request
  const { nama, email, password, role } = req.body;

  try {
    // 2. Cek apakah email sudah terdaftar
    let user = await User.findOne({ email: email });
    if (user) {
      // Jika user ditemukan, berarti email sudah ada
      return res.status(400).json({ msg: 'Email sudah terdaftar' });
    }

    // 3. Jika email belum ada, buat user baru
    user = new User({
      nama,
      email,
      password,
      role, // role bisa 'Dosen' atau 'Mahasiswa'
    });

    // 4. Enkripsi/Hash password sebelum disimpan
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // 5. Simpan user baru ke database
    await user.save();

    // 6. Buat "tiket masuk" (JWT) untuk user
    const payload = {
      user: {
        id: user.id, // Ambil user ID dari database
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET, // Ambil kunci rahasia dari .env
      { expiresIn: '5h' }, // Tiketnya berlaku selama 5 jam
      (err, token) => {
        if (err) throw err;
        // 7. Kirim tiketnya ke user
        res.json({ token });
      }
    );

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route   POST api/auth/login
// @desc    Login user & dapatkan token
// @access  Public
router.post('/login', async (req, res) => {
  // 1. Ambil data dari body request
  const { email, password } = req.body;

  try {
    // 2. Cek apakah ada user dengan email tersebut
    let user = await User.findOne({ email });
    if (!user) {
      // Jika user tidak ditemukan
      return res.status(400).json({ msg: 'Email atau password salah' });
    }

    // 3. Jika user ditemukan, bandingkan password
    // Kita bandingkan password teks biasa dari user (req.body.password)
    // dengan password ter-hash di database (user.password)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // Jika password tidak cocok
      return res.status(400).json({ msg: 'Email atau password salah' });
    }

    // 4. Jika password cocok, buatkan "tiket masuk" (JWT) baru
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '5h' },
      (err, token) => {
        if (err) throw err;
        // 5. Kirim tiketnya ke user
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


module.exports = router;
