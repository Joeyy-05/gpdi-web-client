import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PELAYANAN_LIST } from '../../data/pelayananData';

// ─── Blok Konten: Gambar Kanan, Teks Kiri ────────────────────────────────────
const BlokImageRight = ({ placeholderGambar, teks }) => (
  <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start mb-12">
    {/* Gambar kiri */}
    <div className="w-full md:w-5/12 flex-shrink-0">
      <div className="w-full h-56 md:h-64 bg-gray-200 flex items-center justify-center border border-gray-200">
        <span className="text-gray-500 text-xs text-center px-4">{placeholderGambar}</span>
      </div>
    </div>
    {/* Teks kanan */}
    <div className="flex-1">
      <p className="text-sm md:text-base text-slate-800 leading-relaxed">{teks}</p>
    </div>
  </div>
);

// ─── Blok Konten: Gambar Kiri, Teks Kanan ────────────────────────────────────
const BlokImageLeft = ({ placeholderGambar, teks }) => (
  <div className="flex flex-col md:flex-row-reverse gap-6 md:gap-10 items-start mb-12">
    {/* Gambar kanan */}
    <div className="w-full md:w-5/12 flex-shrink-0">
      <div className="w-full h-56 md:h-64 bg-gray-200 flex items-center justify-center border border-gray-200">
        <span className="text-gray-500 text-xs text-center px-4">{placeholderGambar}</span>
      </div>
    </div>
    {/* Teks kiri */}
    <div className="flex-1">
      <p className="text-sm md:text-base text-slate-800 leading-relaxed">{teks}</p>
    </div>
  </div>
);

// ─── KOMPONEN UTAMA ──────────────────────────────────────────────────────────
const DetailPelayananPage = () => {
  const { slug }   = useParams();
  const navigate   = useNavigate();

  const pelayanan = PELAYANAN_LIST.find((p) => p.slug === slug);

  if (!pelayanan) {
    return (
      <div className="font-sans bg-white min-h-screen flex flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-bold text-slate-800 mb-4">Pelayanan tidak ditemukan</h1>
        <button
          onClick={() => navigate('/pelayanan')}
          className="px-5 py-2 border border-slate-800 bg-white text-slate-800 text-sm font-semibold hover:bg-slate-800 hover:text-white transition"
        >
          ← Kembali ke Pelayanan
        </button>
      </div>
    );
  }

  return (
    <div className="font-sans bg-white min-h-screen">

      {/* ══ JUDUL HALAMAN ══════════════════════════════════════════════════ */}
      <div className="bg-white pt-10 pb-3 text-center px-4">
        <h1
          className="text-2xl md:text-4xl font-bold text-slate-900"
          style={{ fontFamily: "'Courier New', Courier, monospace" }}
        >
          {pelayanan.judul}
        </h1>
        <p className="text-slate-500 mt-2 text-sm">
          {pelayanan.subjudul}
        </p>
      </div>

      {/* ══ PLACEHOLDER BANNER FOTO ════════════════════════════════════════ */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-5">
        <div className="w-full h-52 md:h-72 bg-gray-200 flex items-center justify-center border border-gray-200">
          <span className="text-gray-500 text-sm text-center px-6">
            {pelayanan.placeholderBanner}
          </span>
        </div>
      </div>

      {/* Gap */}
      <div className="h-10 md:h-14" />

      {/* ══ KONTEN ALTERNATING ═════════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {pelayanan.konten.map((blok, idx) => {
          if (blok.type === 'image-right') {
            return (
              <BlokImageRight
                key={idx}
                placeholderGambar={blok.placeholderGambar}
                teks={blok.teks}
              />
            );
          }
          if (blok.type === 'image-left') {
            return (
              <BlokImageLeft
                key={idx}
                placeholderGambar={blok.placeholderGambar}
                teks={blok.teks}
              />
            );
          }
          return null;
        })}
      </section>

      {/* ══ TOMBOL KEMBALI ═════════════════════════════════════════════════ */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <button
          onClick={() => navigate('/pelayanan')}
          className="inline-flex items-center gap-2 px-5 py-2 border border-slate-800 bg-white text-slate-800 text-sm font-semibold hover:bg-slate-800 hover:text-white transition-all duration-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Kembali ke Pelayanan
        </button>
      </div>

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
                  <radialGradient id="ig-grad-dp" cx="30%" cy="107%" r="120%">
                    <stop offset="0%"  stopColor="#fdf497"/>
                    <stop offset="5%"  stopColor="#fdf497"/>
                    <stop offset="45%" stopColor="#fd5949"/>
                    <stop offset="60%" stopColor="#d6249f"/>
                    <stop offset="90%" stopColor="#285AEB"/>
                  </radialGradient>
                </defs>
                <rect width="36" height="36" rx="8" fill="url(#ig-grad-dp)"/>
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

export default DetailPelayananPage;