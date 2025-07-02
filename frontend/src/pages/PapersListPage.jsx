    import React, { useEffect } from 'react';
    import { Link } from 'react-router-dom';
    import { usePaper } from '../context/PaperContext'; // <-- 1. Panggil "shortcut" ke kantor paper

    const PapersListPage = () => {
      // 2. Ambil semua yang kita butuhkan dari "kantor pusat" paper
      const { papers, loading, getPapers } = usePaper();

      // 3. Gunakan useEffect untuk mengambil data saat komponen pertama kali dimuat
      useEffect(() => {
        getPapers();
        // eslint-disable-next-line
      }, []); // Array dependensi kosong memastikan ini hanya berjalan sekali

      // Tampilkan pesan loading jika data belum siap
      if (loading) {
        return <div>Loading paper...</div>;
      }

      // Tampilkan daftar paper jika sudah siap
      return (
        <div>
          <h2>Daftar Semua Paper</h2>
          {papers.length > 0 ? (
            <ul>
              {papers.map((paper) => (
                <li key={paper._id}>
                  <Link to={`/papers/${paper._id}`}>
                    <h3>{paper.title}</h3>
                  </Link>
                  <p>Tahun: {paper.publicationYear}</p>
                  <p>Penulis: {paper.authors.join(', ')}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>Belum ada paper yang diunggah.</p>
          )}
        </div>
      );
    };

    export default PapersListPage;
    