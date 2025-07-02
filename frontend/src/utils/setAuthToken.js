import axios from 'axios';

// Fungsi ini akan mengambil token, dan jika ada,
// akan memasangnya di header 'x-auth-token' untuk SEMUA request axios selanjutnya.
const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    // Jika tidak ada token (misal: saat logout), hapus headernya
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default setAuthToken;