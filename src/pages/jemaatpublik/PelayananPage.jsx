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

      {/* Sedikit padding bawah */}
      <div className="h-4" />
    </div>
  );
};

export default PelayananPage;