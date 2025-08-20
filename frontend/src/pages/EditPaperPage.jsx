import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { usePaper } from '../context/PaperContext'; // <-- 1. Impor usePaper

const EditPaperPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updatePaper } = usePaper(); // <-- 2. Ambil fungsi updatePaper

  const [formData, setFormData] = useState({
    title: '',
    abstract: '',
    authors: '',
    publicationYear: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaper = async () => {
      try {
        const res = await axios.get(`/api/papers/${id}`);
        const { title, abstract, authors, publicationYear } = res.data;
        setFormData({
          title,
          abstract,
          authors: authors.join(', '),
          publicationYear,
        });
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchPaper();
  }, [id]);

  const { title, abstract, authors, publicationYear } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // [*] 3. UBAH FUNGSI INI
  const onSubmit = async (e) => {
    e.preventDefault();
    const paperData = {
      ...formData,
      authors: authors.split(',').map(author => author.trim())
    };
    
    const success = await updatePaper(id, paperData);
    if (success) {
      navigate(`/papers/${id}`); // Kembali ke halaman detail setelah sukses
    }
  };

  if (loading) {
    return <div className="container mx-auto p-4">Loading data paper...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">Edit Paper</CardTitle>
          <CardDescription>
            Perbarui detail paper Anda di bawah ini.
          </CardDescription>
        </CardHeader>
        <form onSubmit={onSubmit}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Judul</Label>
              <Input id="title" name="title" value={title} onChange={onChange} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="abstract">Abstrak</Label>
              <Textarea id="abstract" name="abstract" value={abstract} onChange={onChange} required rows={5} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="authors">Penulis (pisahkan dengan koma)</Label>
              <Input id="authors" name="authors" value={authors} onChange={onChange} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="publicationYear">Tahun Publikasi</Label>
              <Input id="publicationYear" type="number" name="publicationYear" value={publicationYear} onChange={onChange} required />
            </div>
          </CardContent>
          <CardContent>
            <Button type="submit" className="w-full">Simpan Perubahan</Button>
          </CardContent>
        </form>
      </Card>
    </div>
  );
};

export default EditPaperPage;
