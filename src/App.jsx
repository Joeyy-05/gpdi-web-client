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
import AdminLayout from "./layouts/AdminLayout";
import JemaatLayout from "./layouts/JemaatLayout";

// --- IMPOR HALAMAN PUBLIK ---
import HomePage from "./pages/jemaatpublik/HomePage";
import ProfilGerejaPage from "./pages/jemaatpublik/ProfilGerejaPage";
import JadwalPage from "./pages/jemaatpublik/JadwalPage";
import PelayananPage from "./pages/jemaatpublik/PelayananPage";
import GaleriKegiatanPage from "./pages/jemaatpublik/GaleriKegiatanPage";
import PengumumanPage from "./pages/jemaatpublik/PengumumanPage";
import KontakPage from "./pages/jemaatpublik/KontakPage";

// --- IMPOR HALAMAN AUTH ---
import LoginPage from "./pages/auth/LoginPage";

// --- IMPOR HALAMAN JEMAAT AKTIF ---
import RenunganPage from "./pages/jemaat/RenunganPage";
import JadwalIbadahRayonPage from "./pages/jemaat/JadwalIbadahRayonPage";
import PengumumanJemaatPage from "./pages/jemaat/PengumumanJemaatPage";
import RequestSuratPage from "./pages/jemaat/RequestSuratPage";
import ProfilPage from "./pages/jemaat/ProfilPage";
import ManajemenIbadahPage from "./pages/jemaat/ManajemenIbadahPage"; // <-- TAMBAHAN IMPOR MANAJEMEN IBADAH

// --- IMPOR HALAMAN PENDETA (ADMIN) ---
import DashboardPage from "./pages/pendeta/DashboardPage";
import JemaatPage from "./pages/pendeta/JemaatPage";
import KontenPage from "./pages/pendeta/KontenPage";
import JadwalRayonPage from "./pages/pendeta/JadwalRayonPage";
import AdministrasiPage from "./pages/pendeta/AdministrasiPage";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* ==========================================
                        1. RUTE PUBLIK (Menggunakan PublicLayout)
                        ========================================== */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/profil-gereja" element={<ProfilGerejaPage />} />
            <Route path="/jadwal-ibadah" element={<JadwalPage />} />
            <Route path="/pelayanan" element={<PelayananPage />} />
            <Route path="/galeri-kegiatan" element={<GaleriKegiatanPage />} />
            <Route path="/pengumuman" element={<PengumumanPage />} />
            <Route path="/kontak" element={<KontakPage />} />
          </Route>

          {/* ==========================================
                        2. RUTE AUTENTIKASI
                        ========================================== */}
          <Route path="/login" element={<LoginPage />} />

          {/* ==========================================
                        3. RUTE PRIVAT JEMAAT (Menggunakan JemaatLayout)
                        ========================================== */}
          <Route
            element={
              <ProtectedRoute
                allowedRoles={["jemaat", "ketua_rayon", "pendeta", "admin"]}
              />
            }
          >
            <Route element={<JemaatLayout />}>
              {/* Halaman Khusus Jemaat */}
              <Route path="/renungan" element={<RenunganPage />} />
              <Route path="/ibadah-rayon" element={<JadwalIbadahRayonPage />} />
              <Route path="/request-surat" element={<RequestSuratPage />} />
              <Route
                path="/pengumuman-jemaat"
                element={<PengumumanJemaatPage />}
              />
              <Route path="/profil" element={<ProfilPage />} />

              {/* Halaman Manajemen Ibadah (Ketua Rayon + Admin + Pendeta) */}
              <Route
                element={<ProtectedRoute allowedRoles={["ketua_rayon", "admin", "pendeta"]} />}
              >
                <Route
                  path="/manajemen-ibadah"
                  element={<ManajemenIbadahPage />}
                />
              </Route>
            </Route>
          </Route>

          {/* ==========================================
                        4. RUTE PRIVAT PENDETA / ADMIN (Menggunakan AdminLayout)
                        ========================================== */}
          <Route
            element={<ProtectedRoute allowedRoles={["pendeta", "admin"]} />}
          >
            <Route element={<AdminLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route element={<ProtectedRoute allowedRoles={["admin", "pendeta"]} />}>
                <Route path="/dashboard/jemaat" element={<JemaatPage />} />
              </Route>
              <Route path="/dashboard/konten" element={<KontenPage />} />
              <Route path="/dashboard/jadwal" element={<JadwalRayonPage />} />
              <Route
                path="/dashboard/administrasi"
                element={<AdministrasiPage />}
              />
            </Route>
          </Route>

          {/* ==========================================
                        5. FALLBACK ROUTE (Pencegah Layar Blank)
                        ========================================== */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
