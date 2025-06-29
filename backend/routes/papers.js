        const express = require('express');
        const router = express.Router();

        // Panggil "Satpam" kita
        const auth = require('../middleware/auth');

        // Panggil Model
        const Paper = require('../models/Paper');
        const User = require('../models/User');

        // @route   POST api/papers
        // @desc    Membuat/Mengunggah paper baru
        // @access  Private (hanya untuk Dosen)
        router.post('/', auth, async (req, res) => {
          // 1. Ambil data paper dari body request
          const { title, abstract, authors, publicationYear } = req.body;

          try {
            // 2. Cek peran user yang sedang login (dari token)
            // Kita sudah punya akses ke req.user.id dari middleware 'auth'
            const user = await User.findById(req.user.id);
            if (user.role !== 'Dosen') {
              return res.status(403).json({ msg: 'Akses ditolak. Hanya Dosen yang bisa mengunggah paper.' });
            }

            // 3. Buat objek paper baru
            const newPaper = new Paper({
              title,
              abstract,
              authors,
              publicationYear,
              user: req.user.id // <-- Hubungkan paper dengan ID user yang login
            });

            // 4. Simpan ke database
            const paper = await newPaper.save();

            // 5. Kirim data paper yang baru dibuat sebagai respons
            res.json(paper);

          } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
          }
        });

        module.exports = router;
        