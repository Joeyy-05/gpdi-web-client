import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { DUMMY_USERS } from '../../data/dummyUsers';

const LoginPage = () => {
  const [email, setEmail]           = useState('');
  const [password, setPassword]     = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg]     = useState('');
  const [isLoading, setIsLoading]   = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  // ── Akun Demo yang ditampilkan ───────────────────────────────────────────
  const AKUN_DEMO = [
    { label: 'Pendeta / Admin', email: 'pendeta@gpdi.com',  password: 'pendeta123', warna: 'bg-purple-100 text-purple-700 border-purple-200' },
    { label: 'Ketua Rayon 1',   email: 'rayon1@gpdi.com',   password: 'rayon123',   warna: 'bg-blue-100 text-blue-700 border-blue-200' },
    { label: 'Ketua Rayon 2',   email: 'rayon2@gpdi.com',   password: 'rayon123',   warna: 'bg-cyan-100 text-cyan-700 border-cyan-200' },
    { label: 'Jemaat',          email: 'jemaat@gpdi.com',   password: 'jemaat123',  warna: 'bg-green-100 text-green-700 border-green-200' },
  ];

  const isiAkunDemo = (akun) => {
    setEmail(akun.email);
    setPassword(akun.password);
    setErrorMsg('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    // Simulasi delay jaringan
    await new Promise((r) => setTimeout(r, 600));

    // Cari user di data dummy
    const user = DUMMY_USERS.find(
      (u) => u.email === email.trim() && u.password === password
    );

    if (user) {
      // Buat token dummy
      const fakeToken = btoa(JSON.stringify({ id: user.id, role: user.role, exp: Date.now() + 86400000 }));
      login(fakeToken, user);

      // Arahkan sesuai role
      if (user.role === 'pendeta') {
        navigate('/dashboard');
      } else if (user.role === 'ketua_rayon') {
        navigate('/rayon/manajemen-ibadah');
      } else {
        navigate('/jemaat/dashboard');
      }
    } else {
      setErrorMsg('Email atau kata sandi salah. Coba akun demo di bawah.');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex font-sans bg-white">

      {/* ── Sisi Kiri: Banner ───────────────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 items-end pb-16 px-16">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
        <div className="relative z-10 text-white">
          <h2 className="text-4xl font-bold mb-4 leading-tight">
            Sistem Informasi Manajemen<br />GPdI Jemaat Sibulele
          </h2>
          <p className="text-lg text-slate-300 font-medium">
            Melayani dengan kasih, bertumbuh dalam iman.
          </p>
        </div>
      </div>

      {/* ── Sisi Kanan: Form ────────────────────────────────────────────── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 overflow-y-auto">
        <div className="w-full max-w-md">

          {/* Header */}
          <div className="mb-8 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start mb-5">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg mr-3 shadow-md">G</div>
              <span className="font-bold text-2xl text-slate-800 tracking-tight">GPdI Sibulele</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-1">Selamat Datang Kembali</h1>
            <p className="text-slate-500 text-sm">Silakan masuk ke akun Anda.</p>
          </div>

          {/* ── Akun Demo ───────────────────────────────────────────────── */}
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-xs font-bold text-amber-700 mb-2 uppercase tracking-wide">
              🔑 Akun Demo — Klik untuk mengisi otomatis
            </p>
            <div className="grid grid-cols-2 gap-2">
              {AKUN_DEMO.map((akun) => (
                <button
                  key={akun.email}
                  type="button"
                  onClick={() => isiAkunDemo(akun)}
                  className={`text-left px-3 py-2 rounded border text-xs font-semibold transition hover:opacity-80 ${akun.warna}`}
                >
                  <span className="block font-bold">{akun.label}</span>
                  <span className="block opacity-70 font-normal truncate">{akun.email}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Error */}
          {errorMsg && (
            <div className="mb-5 p-3 bg-red-50 border-l-4 border-red-500 rounded-r text-sm text-red-700">
              {errorMsg}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/>
                  </svg>
                </div>
                <input
                  type="email" required value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
                  placeholder="email@gpdi.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Kata Sandi</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'} required value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-blue-600">
                  {showPassword
                    ? <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/></svg>
                    : <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                  }
                </button>
              </div>
            </div>

            <button type="submit" disabled={isLoading}
              className={`w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow transition flex justify-center items-center text-sm ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}>
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Memproses...
                </>
              ) : 'Masuk'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/" className="text-sm text-slate-500 hover:text-blue-600 transition inline-flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;