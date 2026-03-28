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
    </div>
  );
};

export default DetailPelayananPage;