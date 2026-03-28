import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { KEGIATAN_KHUSUS } from './JadwalPage';

const DetailKegiatanPage = () => {
  const { slug }   = useParams();
  const navigate   = useNavigate();

  // Cari kegiatan berdasarkan slug
  const kegiatan = KEGIATAN_KHUSUS.find((k) => k.slug === slug);

  // Jika tidak ditemukan
  if (!kegiatan) {
    return (
      <div className="font-sans bg-white min-h-screen flex flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-bold text-slate-800 mb-4">Kegiatan tidak ditemukan</h1>
        <button
          onClick={() => navigate('/jadwal')}
          className="px-5 py-2 bg-slate-800 text-white text-sm font-semibold hover:bg-slate-700 transition"
        >
          ← Kembali ke Jadwal
        </button>
      </div>
    );
  }

  // Render paragraf deskripsi (pisah per baris kosong)
  const paragraphs = kegiatan.deskripsiLengkap
    .split('\n\n')
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="font-sans bg-white min-h-screen">

      {/* ══ JUDUL HALAMAN (sama dengan JadwalPage) ═════════════════════════ */}
      <div className="bg-white pt-10 pb-3 text-center px-4">
        <h1
          className="text-3xl md:text-4xl font-bold text-slate-900"
          style={{ fontFamily: "'Courier New', Courier, monospace" }}
        >
          Jadwal Ibadah &amp; Kegiatan
        </h1>
        <p className="text-slate-500 mt-2 text-sm">
          Informasi Jadwal Ibadah Rutin dan Kegiatan Gereja
        </p>
      </div>

      {/* ══ PLACEHOLDER FOTO GEDUNG ════════════════════════════════════════ */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <div className="w-full h-52 md:h-64 bg-gray-200 flex items-center justify-center border border-gray-300">
          <span className="text-gray-500 text-sm">Placeholder (Foto Gedung)</span>
        </div>
      </div>

      {/* ══ KONTEN DETAIL ══════════════════════════════════════════════════ */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">

        {/* Judul Kegiatan — italic bold, persis gambar 2 */}
        <h2
          className="text-2xl md:text-3xl font-bold italic text-slate-900 mb-6"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          {kegiatan.judul}
        </h2>

        {/* Tanggal */}
        <p className="text-base md:text-lg mb-6">
          <strong className="font-bold italic">Tanggal</strong>
          <span className="italic"> : {kegiatan.tanggal}</span>
        </p>

        {/* Deskripsi Lengkap */}
        <div className="text-base md:text-lg text-slate-900 space-y-5 leading-relaxed">
          {paragraphs.map((para, idx) => {
            // Paragraf pertama adalah label "Deskripsi:"
            if (idx === 0) {
              return (
                <div key={idx}>
                  <p className="font-bold mb-1">Deskripsi:</p>
                  <p>{para}</p>
                </div>
              );
            }
            // Paragraf berisi baris-baris (Hari/Tanggal, Pukul, Tempat)
            const lines = para.split('\n').filter(Boolean);
            if (lines.length > 1) {
              return (
                <div key={idx} className="space-y-0.5">
                  {lines.map((line, li) => (
                    <p key={li}>{line}</p>
                  ))}
                </div>
              );
            }
            return <p key={idx}>{para}</p>;
          })}
        </div>

        {/* ── Tombol kembali ──────────────────────────────────────────────── */}
        <div className="mt-12">
          <button
            onClick={() => navigate('/jadwal')}
            className="inline-flex items-center gap-2 px-5 py-2 border border-slate-800 bg-white text-slate-800 text-sm font-semibold hover:bg-slate-800 hover:text-white transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Kembali ke Jadwal
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailKegiatanPage;