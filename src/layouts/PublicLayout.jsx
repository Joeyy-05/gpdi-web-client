import React from 'react';
import { Outlet } from 'react-router-dom';
import PublicNavbar from '../components/PublicNavbar';

// Footer sudah ada langsung di dalam masing-masing halaman
// (JadwalPage, DetailKegiatanPage, PelayananPage, DetailPelayananPage)
// PublicLayout hanya menyediakan Navbar + konten halaman saja
const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <PublicNavbar />
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;