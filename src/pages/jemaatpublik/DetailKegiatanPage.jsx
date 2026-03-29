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
                  <radialGradient id="ig-grad-dk" cx="30%" cy="107%" r="120%">
                    <stop offset="0%"  stopColor="#fdf497"/>
                    <stop offset="5%"  stopColor="#fdf497"/>
                    <stop offset="45%" stopColor="#fd5949"/>
                    <stop offset="60%" stopColor="#d6249f"/>
                    <stop offset="90%" stopColor="#285AEB"/>
                  </radialGradient>
                </defs>
                <rect width="36" height="36" rx="8" fill="url(#ig-grad-dk)"/>
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

export default DetailKegiatanPage;