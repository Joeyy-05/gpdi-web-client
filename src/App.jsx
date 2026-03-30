import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// --- IMPOR LAYOUT ---
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
import AllPagesPreview from "./pages/AllPagesPreview";

// --- IMPOR HALAMAN AUTH ---
import LoginPage from "./pages/auth/LoginPage";

// --- IMPOR HALAMAN PENDETA (ADMIN) ---
import DashboardPage from "./pages/pendeta/DashboardPage";
import JemaatPage from "./pages/pendeta/JemaatPage";
import KontenPage from "./pages/pendeta/KontenPage";
import ManajemenIbadahPage from "./pages/ketuarayon/ManajemenIbadahPage";

// --- IMPOR HALAMAN LAINNYA NANTI DI SINI ---
// import JemaatDashboard from './pages/jemaat/JemaatDashboard';
import PengumumanJemaat from "./pages/jemaat/PengumumanJemaat";
import RenunganPage from "./pages/jemaat/RenunganPage";
import JadwalIbadahRayonPage from "./pages/jemaat/JadwalIbadahRayonPage";
import RequestSuratPage from "./pages/jemaat/RequestSuratPage";
import ProfilPage from "./pages/jemaat/ProfilPage";
// import KetuaRayonDashboard from './pages/ketuarayon/KetuaRayonDashboard';

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* --- 1. RUTE JEMAAT (Tampilan Member Tanpa Login) --- */}
          <Route element={<JemaatLayout />}>
            <Route path="/" element={<AllPagesPreview />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/profil-gereja" element={<ProfilGerejaPage />} />
            <Route path="/jadwal-ibadah" element={<JadwalPage />} />
            <Route path="/pelayanan" element={<PelayananPage />} />
            <Route path="/galeri-kegiatan" element={<GaleriKegiatanPage />} />
            <Route path="/pengumuman" element={<PengumumanPage />} />
            <Route path="/pengumuman-jemaat" element={<PengumumanJemaat />} />
            <Route
              path="/pengumuman/:slug"
              element={<div>Detail Pengumuman (Placeholder)</div>}
            />
            <Route path="/kontak" element={<KontakPage />} />
            <Route path="/profil" element={<ProfilPage />} />

            {/* Rute-rute tambahan jemaat */}
            <Route path="/renungan" element={<RenunganPage />} />
            <Route
              path="/renungan/:id"
              element={<div>Detail Renungan (Placeholder)</div>}
            />
            <Route path="/ibadah-rayon" element={<JadwalIbadahRayonPage />} />
            <Route
              path="/manajemen-ibadah-rayon"
              element={<ManajemenIbadahPage />}
            />
            <Route path="/request-surat" element={<RequestSuratPage />} />
          </Route>

          {/* --- 2. RUTE AUTENTIKASI --- */}
          <Route path="/login" element={<LoginPage />} />

          {/* --- 3. RUTE PRIVAT: PENDETA (ADMIN) --- */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/dashboard/jemaat" element={<JemaatPage />} />
              <Route path="/dashboard/konten" element={<KontenPage />} />
              <Route
                path="/dashboard/jadwal"
                element={<ManajemenIbadahPage />}
              />
              <Route
                path="/dashboard/manajemen-ibadah"
                element={<ManajemenIbadahPage />}
              />
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
