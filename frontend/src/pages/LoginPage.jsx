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

    const LoginPage = () => {
      const { login, isAuthenticated } = useAuth();
      const navigate = useNavigate();

      useEffect(() => {
        if (isAuthenticated) {
          navigate('/dashboard'); // Arahkan ke Dashboard setelah login
        }
      }, [isAuthenticated, navigate]);

      const [formData, setFormData] = useState({
        email: '',
        password: '',
      });

      const { email, password } = formData;

      const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

      const onSubmit = (e) => {
        e.preventDefault();
        login({ email, password });
      };

      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>
                Masukkan email dan password Anda untuk masuk ke akun Anda.
              </CardDescription>
            </CardHeader>
            <form onSubmit={onSubmit}>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="nama@contoh.com"
                    value={email}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col">
                <Button type="submit" className="w-full">Login</Button>
                <p className="mt-4 text-center text-sm text-muted-foreground">
                  Belum punya akun?{" "}
                  <Link to="/register" className="underline">
                    Register
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Card>
        </div>
      );
    };

    export default LoginPage;
    