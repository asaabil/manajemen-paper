    import React, { useState, useEffect } from 'react';
    import { useParams, Link } from 'react-router-dom';
    import axios from 'axios';

    const PaperDetailPage = () => {
      const { id } = useParams();

      const [paper, setPaper] = useState(null);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
        const fetchPaper = async () => {
          try {
            const res = await axios.get(`/api/papers/${id}`);
            setPaper(res.data);
          } catch (err) {
            console.error('Gagal mengambil data detail paper:', err);
          } finally {
            setLoading(false);
          }
        };

        fetchPaper();
      }, [id]);

      if (loading) {
        return <div>Loading detail paper...</div>;
      }

      if (!paper) {
        return <div>Paper tidak ditemukan. <Link to="/papers">Kembali ke daftar</Link></div>;
      }

      return (
        <div>
          <h2>{paper.title}</h2>
          <p><strong>Penulis:</strong> {paper.authors.join(', ')}</p>
          <p><strong>Tahun Publikasi:</strong> {paper.publicationYear}</p>
          
          {/* [+] TAMBAHKAN BLOK DI BAWAH INI */}
          {paper.filePath && (
            <div>
              <a 
                href={`http://localhost:5000/${paper.filePath}`} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <button>Lihat / Unduh Paper (PDF)</button>
              </a>
            </div>
          )}
          
          <hr />
          <h3>Abstrak</h3>
          <p>{paper.abstract}</p>
        </div>
      );
    };

    export default PaperDetailPage;
    