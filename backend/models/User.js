const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Setiap email harus unik, gak boleh ada yang sama
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['Dosen', 'Mahasiswa', 'Admin'], // Peran hanya boleh salah satu dari ini
    default: 'Mahasiswa', // Nilai default jika tidak diisi
  },
}, {
  timestamps: true // Otomatis nambahin kolom createdAt dan updatedAt
});

module.exports = mongoose.model('User', UserSchema);