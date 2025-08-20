    import React, { useState, useEffect } from 'react';
    import { useParams, Link, useNavigate } from 'react-router-dom';
    import axios from 'axios';
    import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
    import { Button } from '@/components/ui/button';
    import { useAuth } from '../context/AuthContext';
    import { usePaper } from '../context/PaperContext';

    const PaperDetailPage = () => {
      const { id } = useParams();
      const navigate = useNavigate();
      const { user, isAuthenticated } = useAuth();
      const { deletePaper } = usePaper();

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

      const handleDelete = async () => {
        const success = await deletePaper(paper._id);
        if (success) {
          navigate('/papers');
        }
      };

      if (loading) {
        return <div className="container mx-auto p-4">Loading detail paper...</div>;
      }

      if (!paper) {
        return (
          <div className="container mx-auto p-4 text-center">
            <h2 className="text-xl font-semibold">Paper Tidak Ditemukan</h2>
            <Button asChild className="mt-4">
              <Link to="/papers">Kembali ke Daftar</Link>
            </Button>
          </div>
        );
      }

      const isOwner = isAuthenticated && user && paper && paper.user && user._id === paper.user;

      return (
        <div className="container mx-auto p-4 md:p-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl">{paper.title || "(Judul tidak tersedia)"}</CardTitle>
              <CardDescription>
                Oleh {Array.isArray(paper.authors) ? paper.authors.join(', ') : "(Penulis tidak tersedia)"} - Dipublikasikan tahun {paper.publicationYear || "(Tahun tidak tersedia)"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isOwner && (
                <div className="flex items-center gap-2 mb-4">
                  {/* [*] UBAH TOMBOL INI */}
                  <Button asChild variant="outline" size="sm">
                    <Link to={`/papers/${paper._id}/edit`}>Edit Paper</Link>
                  </Button>
                  <Button variant="destructive" size="sm" onClick={handleDelete}>Hapus Paper</Button>
                </div>
              )}
              <h3 className="font-semibold text-lg mb-2">Abstrak</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {paper.abstract || "(Abstrak tidak tersedia)"}
              </p>
            </CardContent>
            <CardFooter>
              {paper.filePath ? (
                <Button asChild>
                  <a href={`http://localhost:5000/${paper.filePath.replace(/\\/g, "/")}`} target="_blank" rel="noopener noreferrer">
                    Lihat / Unduh Paper (PDF)
                  </a>
                </Button>
              ) : (
                <span className="text-muted-foreground">File tidak tersedia</span>
              )}
            </CardFooter>
          </Card>
        </div>
      );
    };

    export default PaperDetailPage;
    