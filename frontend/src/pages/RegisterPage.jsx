    import React, { useState, useEffect } from 'react';
    import { useNavigate, Link } from 'react-router-dom';
    import { useAuth } from '../context/AuthContext';
    import { Button } from "@/components/ui/button";
    import {
      Card,
      CardContent,
      CardDescription,
      CardFooter,
      CardHeader,
      CardTitle,
    } from "@/components/ui/card";
    import { Input } from "@/components/ui/input";
    import { Label } from "@/components/ui/label";
    import {
      Select,
      SelectContent,
      SelectItem,
      SelectTrigger,
      SelectValue,
    } from "@/components/ui/select";

    const RegisterPage = () => {
      const { register, isAuthenticated } = useAuth();
      const navigate = useNavigate();

      useEffect(() => {
        if (isAuthenticated) {
          navigate('/dashboard');
        }
      }, [isAuthenticated, navigate]);
      
      const [formData, setFormData] = useState({
        nama: '',
        email: '',
        password: '',
        password2: '',
        role: 'Mahasiswa',
      });

      const { nama, email, password, password2, role } = formData;

      const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

      // Handler khusus untuk komponen Select dari shadcn/ui
      const handleRoleChange = (value) => {
        setFormData({ ...formData, role: value });
      };

      const onSubmit = (e) => {
        e.preventDefault();
        if (password !== password2) {
          alert('Password tidak cocok!');
          return;
        }
        register({ nama, email, password, role });
      };

      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Register</CardTitle>
              <CardDescription>
                Buat akun baru untuk mulai mengelola paper Anda.
              </CardDescription>
            </CardHeader>
            <form onSubmit={onSubmit}>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="nama">Nama Lengkap</Label>
                  <Input id="nama" name="nama" value={nama} onChange={onChange} required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" name="email" value={email} onChange={onChange} required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" name="password" value={password} onChange={onChange} required minLength="6" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password2">Konfirmasi Password</Label>
                  <Input id="password2" type="password" name="password2" value={password2} onChange={onChange} required minLength="6" />
                </div>
                <div className="grid gap-2">
                  <Label>Mendaftar sebagai</Label>
                  <Select value={role} onValueChange={handleRoleChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih peran Anda" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mahasiswa">Mahasiswa</SelectItem>
                      <SelectItem value="Dosen">Dosen</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col">
                <Button type="submit" className="w-full">Buat Akun</Button>
                <p className="mt-4 text-center text-sm text-muted-foreground">
                  Sudah punya akun?{" "}
                  <Link to="/login" className="underline">
                    Login
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Card>
        </div>
      );
    };

    export default RegisterPage;
    