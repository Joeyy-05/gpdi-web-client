import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// --- IMPOR LAYOUT ---
import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout"; // (Layout ini khusus untuk Pendeta/Admin)
import JemaatLayout from "./layouts/JemaatLayout";

// --- IMPOR HALAMAN JEMAAT PUBLIK ---
import HomePage from "./pages/jemaatpublik/HomePage";
import ProfilGerejaPage from "./pages/jemaatpublik/ProfilGerejaPage";
import PelayananPage from "./pages/jemaatpublik/PelayananPage";
import GaleriKegiatanPage from "./pages/jemaatpublik/GaleriKegiatanPage";
import PengumumanPage from "./pages/jemaatpublik/PengumumanPage";
import JadwalPage from "./pages/jemaatpublik/JadwalPage";
import KontakPage from "./pages/jemaatpublik/KontakPage";

// --- IMPOR HALAMAN AUTH ---
import LoginPage from "./pages/auth/LoginPage";

// --- IMPOR HALAMAN PENDETA (ADMIN) ---
import DashboardPage from "./pages/pendeta/DashboardPage";
import JemaatPage from "./pages/pendeta/JemaatPage";
import KontenPage from "./pages/pendeta/KontenPage";

// --- IMPOR HALAMAN LAINNYA NANTI DI SINI ---
// import JemaatDashboard from './pages/jemaat/JemaatDashboard';
// import KetuaRayonDashboard from './pages/ketuarayon/KetuaRayonDashboard';

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* --- 1. RUTE PUBLIK (jemaatpublik) --- */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/profil-gereja" element={<ProfilGerejaPage />} />
            <Route path="/jadwal-ibadah" element={<JadwalPage />} />
            <Route path="/pelayanan" element={<PelayananPage />} />
            <Route path="/galeri-kegiatan" element={<GaleriKegiatanPage />} />
            <Route path="/pengumuman" element={<PengumumanPage />} />
            <Route path="/kontak" element={<KontakPage />} />
          </Route>

          {/* --- 2. RUTE AUTENTIKASI --- */}
          <Route path="/login" element={<LoginPage />} />

          {/* --- 3. RUTE PRIVAT: PENDETA (ADMIN) --- */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/dashboard/jemaat" element={<JemaatPage />} />
              <Route path="/dashboard/konten" element={<KontenPage />} />
            </Route>
          </Route>

          {/* --- 4. RUTE PRIVAT: JEMAAT & KETUA RAYON (Persiapan) --- */}
          <Route element={<ProtectedRoute />}>
            <Route element={<JemaatLayout />}>
              {/* Rute-rute yang menggunakan JemaatNavbar dan JemaatFooter */}
              <Route
                path="/renungan"
                element={<div>Halaman Renungan Harian (Placeholder)</div>}
              />
              <Route
                path="/ibadah-rayon"
                element={
                  <div>Halaman Manajemen Ibadah Rayon (Placeholder)</div>
                }
              />
              <Route
                path="/request-surat"
                element={<div>Halaman Request Surat (Placeholder)</div>}
              />
              <Route path="/jemaat/pengumuman" element={<PengumumanPage />} />
            </Route>
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
