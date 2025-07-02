    const express = require('express');
    const router = express.Router();
    const auth = require('../middleware/auth');
    const multer = require('multer');
    const path = require('path'); // Impor 'path' untuk mengambil ekstensi file

    const Paper = require('../models/Paper');
    const User = require('../models/User');

    // --- [*] UBAH KONFIGURASI MULTER DI SINI ---
    // Konfigurasi penyimpanan yang lebih detail
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Tetap simpan di folder 'uploads'
      },
      filename: function (req, file, cb) {
        // Buat nama file unik: nama field + timestamp + ekstensi asli
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
      }
    });

    const upload = multer({ storage: storage });
    // --- SAMPAI SINI ---

    // @route   POST api/papers
    // @desc    Membuat/Mengunggah paper baru
    // @access  Private (hanya untuk Dosen)
    router.post('/', [auth, upload.single('paperFile')], async (req, res) => {
      const { title, abstract, authors, publicationYear } = req.body;

      try {
        const user = await User.findById(req.user.id);
        if (user.role !== 'Dosen') {
          return res.status(403).json({ msg: 'Akses ditolak. Hanya Dosen yang bisa mengunggah paper.' });
        }

        if (!req.file) {
            return res.status(400).json({ msg: 'File paper wajib diunggah.' });
        }

        const newPaper = new Paper({
          title,
          abstract,
          authors: JSON.parse(authors),
          publicationYear,
          user: req.user.id,
          filePath: req.file.path.replace(/\\/g, "/") // Ganti backslash jadi forward slash untuk konsistensi
        });

        const paper = await newPaper.save();
        res.json(paper);

      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    });

        // @route   GET api/papers
// @desc    Mengambil semua paper
// @access  Public
router.get('/', async (req, res) => {
  try {
    // Cari semua paper, urutkan dari yang paling baru (-1)
    const papers = await Paper.find().sort({ createdAt: -1 });
    res.json(papers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route   GET api/papers/:id
// @desc    Mengambil satu paper berdasarkan ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const paper = await Paper.findById(req.params.id);

    // Cek jika paper dengan ID tersebut tidak ada
    if (!paper) {
      return res.status(404).json({ msg: 'Paper tidak ditemukan' });
    }

    res.json(paper);
  } catch (err) {
    console.error(err.message);
    // Jika ID-nya tidak valid formatnya, kirim error yang sama
    if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Paper tidak ditemukan' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/papers/:id
// @desc    Mengupdate paper
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { title, abstract, authors, publicationYear } = req.body;

  // Buat objek paper baru dari data yang dikirim
  const paperFields = {};
  if (title) paperFields.title = title;
  if (abstract) paperFields.abstract = abstract;
  if (authors) paperFields.authors = authors;
  if (publicationYear) paperFields.publicationYear = publicationYear;

  try {
    // 1. Cari paper yang mau diupdate berdasarkan ID
    let paper = await Paper.findById(req.params.id);

    if (!paper) return res.status(404).json({ msg: 'Paper tidak ditemukan' });

    // 2. Pastikan user yang mau ngedit adalah pemilik paper
    // paper.user isinya ObjectId, jadi kita konversi ke string
    if (paper.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Akses tidak diizinkan' });
    }

    // 3. Lakukan update
    paper = await Paper.findByIdAndUpdate(
      req.params.id,
      { $set: paperFields },
      { new: true } // 'new: true' agar mengembalikan dokumen yang sudah diupdate
    );

    res.json(paper);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route   DELETE api/papers/:id
// @desc    Menghapus paper
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    // 1. Cari paper yang mau dihapus berdasarkan ID
    let paper = await Paper.findById(req.params.id);

    if (!paper) return res.status(404).json({ msg: 'Paper tidak ditemukan' });

    // 2. Pastikan user yang mau ngehapus adalah pemilik paper
    if (paper.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Akses tidak diizinkan' });
    }

    // 3. Lakukan penghapusan
    await Paper.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Paper berhasil dihapus' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});



        module.exports = router;
        