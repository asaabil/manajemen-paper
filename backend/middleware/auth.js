const jwt = require('jsonwebtoken');

// Middleware adalah fungsi yang punya akses ke object request (req), 
// object response (res), dan fungsi next() untuk lanjut ke middleware/rute berikutnya.
module.exports = function (req, res, next) {
  // 1. Ambil token dari header request
  const token = req.header('x-auth-token');

  // 2. Cek jika tidak ada token
  if (!token) {
    return res.status(401).json({ msg: 'Akses ditolak, tidak ada token' });
  }

  // 3. Jika token ada, verifikasi tokennya
  try {
    // Coba decode tokennya pake kunci rahasia kita
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Kalo berhasil, 'decoded' akan berisi payload (user: {id: ...})
    // Kita "tempelkan" info user itu ke object request biar bisa dipake sama rute nanti
    req.user = decoded.user;
    
    // Lanjut ke rute yang dituju
    next();
  } catch (err) {
    // Kalo tokennya gak valid (salah kunci, udah expired, dll)
    res.status(401).json({ msg: 'Token tidak valid' });
  }
};
