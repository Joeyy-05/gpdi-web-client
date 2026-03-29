import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// --- LAYOUT ---
import PublicLayout from './layouts/PublicLayout';
import AdminLayout  from './layouts/AdminLayout';

// --- HALAMAN PUBLIK ---
import HomePage            from './pages/jemaatpublik/HomePage';
import JadwalPage          from './pages/jemaatpublik/JadwalPage';
import DetailKegiatanPage  from './pages/jemaatpublik/DetailKegiatanPage';
import PelayananPage       from './pages/jemaatpublik/PelayananPage';
import DetailPelayananPage from './pages/jemaatpublik/DetailPelayananPage';
import GaleriPage          from './pages/jemaatpublik/GaleriPage';

// --- AUTH ---
import LoginPage from './pages/auth/LoginPage';

// --- HALAMAN ADMIN ---
import DashboardPage from './pages/pendeta/DashboardPage';
import JemaatPage    from './pages/pendeta/JemaatPage';
import KontenPage    from './pages/pendeta/KontenPage';

import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>

          {/* ── RUTE PUBLIK (dengan Navbar) ───────────────────────────── */}
          <Route element={<PublicLayout />}>
            <Route path="/"                element={<HomePage            />} />
            <Route path="/jadwal"          element={<JadwalPage          />} />
            <Route path="/jadwal/:slug"    element={<DetailKegiatanPage  />} />
            <Route path="/pelayanan"       element={<PelayananPage       />} />
            <Route path="/pelayanan/:slug" element={<DetailPelayananPage />} />
            <Route path="/galeri"          element={<GaleriPage          />} />
          </Route>

          {/* ── AUTH ──────────────────────────────────────────────────── */}
          <Route path="/login" element={<LoginPage />} />

          {/* ── RUTE PRIVAT: ADMIN ────────────────────────────────────── */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/dashboard"         element={<DashboardPage />} />
              <Route path="/dashboard/jemaat"  element={<JemaatPage    />} />
              <Route path="/dashboard/konten"  element={<KontenPage    />} />
            </Route>
          </Route>

          {/* ── FALLBACK ──────────────────────────────────────────────── */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;