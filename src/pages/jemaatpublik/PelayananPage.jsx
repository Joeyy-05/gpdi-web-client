import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PELAYANAN_LIST } from '../../data/pelayananData';

const PelayananPage = () => {
  const navigate = useNavigate();

  return (
    <div className="font-sans bg-white min-h-screen">

      {/* ══ JUDUL HALAMAN ══════════════════════════════════════════════════ */}
      <div className="bg-white pt-10 pb-3 text-center px-4">
        <h1
          className="text-3xl md:text-4xl font-bold text-slate-900"
          style={{ fontFamily: "'Courier New', Courier, monospace" }}
        >
          Informasi Pelayanan
        </h1>
        <p className="text-slate-500 mt-2 text-sm md:text-base">
          Berbagai Bentuk Pelayanan di GPdI Jemaat Sibulele
        </p>
      </div>

      {/* ══ PLACEHOLDER FOTO GEDUNG ════════════════════════════════════════ */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-5">
        <div className="w-full h-52 md:h-72 bg-gray-200 flex items-center justify-center border border-gray-200">
          <span className="text-gray-500 text-sm">Placeholder (Foto Gedung)</span>
        </div>
      </div>

      {/* Gap — persis Figma ada jarak besar antara banner dan kartu */}
      <div className="h-10 md:h-16" />

      {/* ══ GRID KARTU PELAYANAN ═══════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PELAYANAN_LIST.map((item) => (
            <div
              key={item.id}
              className="border border-slate-200 bg-white p-5 flex flex-col"
            >
              {/* Icon placeholder — kotak abu kecil di pojok kiri atas */}
              <div className="w-8 h-8 bg-gray-300 mb-4 flex-shrink-0" />

              {/* Judul */}
              <h3 className="text-sm md:text-base font-bold text-slate-900 mb-2">
                {item.judul}
              </h3>

              {/* Deskripsi singkat */}
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed flex-1 mb-4">
                {item.deskripsiSingkat}
              </p>

              {/* Tombol Lihat Detail */}
              <div>
                <button
                  onClick={() => navigate(`/pelayanan/${item.slug}`)}
                  className="px-4 py-1.5 border border-slate-700 bg-white text-slate-800 text-xs font-semibold hover:bg-slate-800 hover:text-white transition-all duration-200"
                >
                  Lihat Detail
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gap sebelum CTA */}
      <div className="h-10 md:h-16" />

      {/* ══ SECTION CTA "TERLIBAT DALAM PELAYANAN" ════════════════════════ */}
      <section className="bg-gray-100 py-16 md:py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Terlibat dalam Pelayanan
          </h2>
          <p className="text-slate-600 text-sm md:text-base mb-8 max-w-xl mx-auto">
            Bergabunglah bersama kami untuk melayani Tuhan dan sesama melalui berbagai pelayanan yang tersedia.
          </p>
          <button className="px-8 py-3 bg-red-700 hover:bg-red-800 text-white font-bold rounded-full text-sm md:text-base transition shadow-md">
            Daftar Pelayanan
          </button>
        </div>
      </section>

      {/* ══ FOOTER ═════════════════════════════════════════════════════════ */}
      <footer className="font-sans mt-auto">
        <div className="bg-gray-100 border-t border-gray-200 py-8 px-4 text-center">
          <p className="font-bold text-slate-900 text-sm mb-1">GPdI Sibulele</p>
          <p className="font-bold text-slate-900 text-sm mb-4">
            Jalan Contoh No.123, Kota A, Provinsi A, 12345
          </p>
          <div className="flex justify-center items-center gap-5 mb-4">
            <a href="#" aria-label="Facebook" className="hover:opacity-80 transition-opacity">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="36" height="36" rx="6" fill="#1877F2"/>
                <path d="M24 18C24 14.686 21.314 12 18 12C14.686 12 12 14.686 12 18C12 20.988 14.123 23.472 16.969 23.924V19.781H15.43V18H16.969V16.66C16.969 15.14 17.861 14.313 19.244 14.313C19.908 14.313 20.602 14.43 20.602 14.43V15.924H19.836C19.081 15.924 18.844 16.395 18.844 16.879V18H20.531L20.262 19.781H18.844V23.924C21.69 23.472 24 20.988 24 18Z" fill="white"/>
              </svg>
            </a>
            <a href="#" aria-label="Instagram" className="hover:opacity-80 transition-opacity">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient id="ig-grad-p" cx="30%" cy="107%" r="120%">
                    <stop offset="0%"  stopColor="#fdf497"/>
                    <stop offset="5%"  stopColor="#fdf497"/>
                    <stop offset="45%" stopColor="#fd5949"/>
                    <stop offset="60%" stopColor="#d6249f"/>
                    <stop offset="90%" stopColor="#285AEB"/>
                  </radialGradient>
                </defs>
                <rect width="36" height="36" rx="8" fill="url(#ig-grad-p)"/>
                <rect x="11" y="11" width="14" height="14" rx="4" stroke="white" strokeWidth="1.8" fill="none"/>
                <circle cx="18" cy="18" r="3.5" stroke="white" strokeWidth="1.8" fill="none"/>
                <circle cx="22.3" cy="13.7" r="1" fill="white"/>
              </svg>
            </a>
            <a href="#" aria-label="YouTube" className="hover:opacity-80 transition-opacity">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="36" height="36" rx="6" fill="#FF0000"/>
                <path d="M26.16 14.34C25.92 13.44 25.22 12.74 24.32 12.5C22.68 12 18 12 18 12C18 12 13.32 12 11.68 12.5C10.78 12.74 10.08 13.44 9.84 14.34C9.34 15.98 9.34 18 9.34 18C9.34 18 9.34 20.02 9.84 21.66C10.08 22.56 10.78 23.26 11.68 23.5C13.32 24 18 24 18 24C18 24 22.68 24 24.32 23.5C25.22 23.26 25.92 22.56 26.16 21.66C26.66 20.02 26.66 18 26.66 18C26.66 18 26.66 15.98 26.16 14.34Z" fill="#FF0000" stroke="white" strokeWidth="0.5"/>
                <polygon points="16,15.5 21,18 16,20.5" fill="white"/>
              </svg>
            </a>
          </div>
          <p className="text-slate-800 text-sm font-medium">Copyright &copy; 2023</p>
        </div>
        <div className="bg-white py-4 px-4 text-center border-t border-gray-100">
          <p className="text-slate-700 text-sm">
            &copy; 2026 GPdI Jemaat Sibulele. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PelayananPage;