import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// --- LAYOUT ---
import PublicLayout from './layouts/PublicLayout';
import AdminLayout  from './layouts/AdminLayout';

// --- HALAMAN PUBLIK ---
import HomePage    from './pages/jemaatpublik/HomePage';
import JadwalPage  from './pages/jemaatpublik/JadwalPage';   // ← BARU

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
                    {/* ── RUTE PUBLIK ─────────────────────────────────── */}
                    <Route element={<PublicLayout />}>
                        <Route path="/"        element={<HomePage   />} />
                        <Route path="/jadwal"  element={<JadwalPage />} />  {/* ← BARU */}
                        {/* Tambahkan rute publik lain di sini (profil, pelayanan, galeri, kontak) */}
                    </Route>

                    {/* ── AUTH ────────────────────────────────────────── */}
                    <Route path="/login" element={<LoginPage />} />

                    {/* ── RUTE PRIVAT: ADMIN ──────────────────────────── */}
                    <Route element={<ProtectedRoute />}>
                        <Route element={<AdminLayout />}>
                            <Route path="/dashboard"          element={<DashboardPage />} />
                            <Route path="/dashboard/jemaat"   element={<JemaatPage    />} />
                            <Route path="/dashboard/konten"   element={<KontenPage    />} />
                        </Route>
                    </Route>

                    {/* ── FALLBACK ─────────────────────────────────────── */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;