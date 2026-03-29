import React from 'react';
import { Outlet } from 'react-router-dom';
import JemaatNavbar from '../components/JemaatNavbar';

// Footer sistem internal
const SistemFooter = () => (
  <footer className="bg-white border-t border-slate-200 mt-auto">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <p className="font-bold text-slate-800 text-sm">Sistem Informasi GPdI Jemaat Sibulele</p>
          <p className="text-slate-500 text-xs mt-1">Versi Sistem: 1.0.0</p>
          <p className="text-slate-500 text-xs">Tahun: 2025</p>
        </div>
        <div className="text-right space-y-1">
          <p className="text-slate-500 text-xs hover:text-blue-600 cursor-pointer transition">Panduan Penggunaan</p>
          <p className="text-slate-500 text-xs hover:text-blue-600 cursor-pointer transition">Hubungi Administrator</p>
          <p className="text-slate-500 text-xs hover:text-blue-600 cursor-pointer transition">Kebijakan Privasi Internal</p>
        </div>
      </div>
    </div>
  </footer>
);

const JemaatLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <JemaatNavbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <SistemFooter />
    </div>
  );
};

export default JemaatLayout;