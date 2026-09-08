import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth";

// Impor komponen publik & jemaat
import PublicNavbar from "../components/PublicNavbar";
import JemaatNavbar from "../components/JemaatNavbar";
// Pastikan Anda mengimpor komponen Footer publik Anda, sesuaikan path/nama failnya jika berbeda
import PublicFooter from "../components/PublicFooter";
import JemaatFooter from "../components/JemaatFooter";

export default function PublicLayout() {
  // Menarik status login dari context
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex min-h-screen flex-col bg-[#F8F9FA]">
      {/* LOGIKA SWAP NAVBAR OTOMATIS: 
          Jika login -> Munculkan Navbar Jemaat. Jika tidak -> Navbar Publik */}
      {isAuthenticated ? <JemaatNavbar /> : <PublicNavbar />}

      <main className="flex-grow">
        <Outlet />
      </main>

      {/* LOGIKA SWAP FOOTER OTOMATIS */}
      {isAuthenticated ? <JemaatFooter /> : <PublicFooter />}
    </div>
  );
}
