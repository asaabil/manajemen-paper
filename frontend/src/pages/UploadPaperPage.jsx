    import React, { useState } from 'react';
    import { useNavigate } from 'react-router-dom';
    import { usePaper } from '../context/PaperContext';

    const UploadPaperPage = () => {
      const { createPaper } = usePaper();
      const navigate = useNavigate();

      const [formData, setFormData] = useState({
        title: '',
        abstract: '',
        authors: '',
        publicationYear: '',
      });
      // [+] State baru untuk menyimpan file
      const [file, setFile] = useState(null);

      const { title, abstract, authors, publicationYear } = formData;

      const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

      // [+] Handler baru untuk file input
      const onFileChange = (e) => {
        setFile(e.target.files[0]);
      };

      const onSubmit = (e) => {
        e.preventDefault();
        
        // [*] Ubah cara pengiriman data
        // 1. Buat objek FormData
        const uploadData = new FormData();

        // 2. Tempelkan semua data ke FormData
        uploadData.append('title', title);
        uploadData.append('abstract', abstract);
        // Kita kirim authors sebagai string JSON, karena FormData tidak bisa handle array langsung
        uploadData.append('authors', JSON.stringify(authors.split(',').map(author => author.trim())));
        uploadData.append('publicationYear', publicationYear);
        uploadData.append('paperFile', file); // 'paperFile' harus cocok dengan di backend multer

        // 3. Panggil fungsi dari context dengan FormData
        createPaper(uploadData);

        // Arahkan ke halaman daftar paper setelah submit
        navigate('/papers');
      };

      return (
        <div>
          <h2>Unggah Paper Baru</h2>
          <form onSubmit={onSubmit}>
            <div>
              <label>Judul</label>
              <input type="text" name="title" value={title} onChange={onChange} required />
            </div>
            <div>
              <label>Abstrak</label>
              <textarea name="abstract" value={abstract} onChange={onChange} required />
            </div>
            <div>
              <label>Penulis (pisahkan dengan koma)</label>
              <input type="text" name="authors" value={authors} onChange={onChange} required />
            </div>
            <div>
              <label>Tahun Publikasi</label>
              <input type="number" name="publicationYear" value={publicationYear} onChange={onChange} required />
            </div>
            {/* [+] Tambahkan input file */}
            <div>
              <label>File Paper (PDF)</label>
              <input type="file" name="paperFile" onChange={onFileChange} required />
            </div>
            <button type="submit">Unggah Paper</button>
          </form>
        </div>
      );
    };

    export default UploadPaperPage;
    