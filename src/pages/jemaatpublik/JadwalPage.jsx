import React, { useState, useEffect } from 'react';

// ─── DATA STATIS (ganti dengan API call nantinya) ────────────────────────────
const JADWAL_RUTIN = [
  { id: 1, hari: 'Minggu', jenis: 'Ibadah Umum',    waktu: '10:00', tempat: 'Gedung Utama' },
  { id: 2, hari: 'Rabu',   jenis: 'Ibadah Doa',     waktu: '19:00', tempat: 'Aula Gereja'  },
  { id: 3, hari: 'Jumat',  jenis: 'Ibadah Pemuda',  waktu: '18:30', tempat: 'Gedung Utama' },
  { id: 4, hari: 'Sabtu',  jenis: 'Sekolah Minggu', waktu: '09:00', tempat: 'Ruang Kelas'  },
];

const KEGIATAN_KHUSUS = [
  {
    id: 1,
    judul: 'Perayaan Natal Bersama',
    tanggal: '25 Desember 2024',
    deskripsi: 'Ibadah perayaan Natal bersama seluruh jemaat dan keluarga.',
    detail:
      'Hadir bersama keluarga dalam perayaan Natal yang penuh sukacita. Acara dimulai pukul 18.00 WIB dan diisi dengan drama musikal, paduan suara, serta pembagian bingkisan untuk anak-anak. Dresscode: Putih & Merah.',
  },
  {
    id: 2,
    judul: 'Retreat Pemuda',
    tanggal: '10-12 Juli 2025',
    deskripsi: 'Retreat rohani untuk pemuda gereja di luar kota.',
    detail:
      'Program retreat 3 hari 2 malam di Pusat Retret Bukit Doa, Puncak. Diisi sesi firman Tuhan, outbound rohani, dan persekutuan. Pendaftaran dibuka hingga 30 Juni 2025. Biaya Rp 350.000/orang.',
  },
  {
    id: 3,
    judul: 'Bakti Sosial',
    tanggal: '15 Agustus 2025',
    deskripsi: 'Kegiatan sosial membantu masyarakat yang membutuhkan.',
    detail:
      'Kegiatan meliputi pembagian sembako, pengobatan gratis, dan penyuluhan kesehatan untuk warga sekitar gereja. Jemaat yang ingin berpartisipasi dapat mendaftar ke sekretariat gereja.',
  },
];

const KATEGORI_OPTIONS = [
  'Semua Kegiatan',
  'Ibadah Umum',
  'Ibadah Doa',
  'Ibadah Pemuda',
  'Sekolah Minggu',
];

// ─── KOMPONEN UTAMA ──────────────────────────────────────────────────────────
const JadwalPage = () => {
  const [kategori, setKategori] = useState('Semua Kegiatan');
  const [cari, setCari]         = useState('');
  const [modal, setModal]       = useState(null);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setModal(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const jadwalFiltered = JADWAL_RUTIN.filter((item) => {
    const matchKat  = kategori === 'Semua Kegiatan' || item.jenis === kategori;
    const q         = cari.toLowerCase();
    const matchCari =
      item.hari.toLowerCase().includes(q) ||
      item.jenis.toLowerCase().includes(q) ||
      item.tempat.toLowerCase().includes(q);
    return matchKat && matchCari;
  });

  return (
    <div className="font-sans bg-white min-h-screen">

      {/* ══ JUDUL HALAMAN ══════════════════════════════════════════════════ */}
      <div className="bg-white pt-10 pb-2 text-center px-4">
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-5">
        <div className="w-full h-52 md:h-64 bg-gray-200 flex items-center justify-center border border-gray-300">
          <span className="text-gray-500 text-sm">Placeholder (Foto Gedung)</span>
        </div>
      </div>

      {/* ══ GARIS PEMISAH ═════════════════════════════════════════════════ */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <hr className="border-slate-300" />
      </div>

      {/* ══ JADWAL IBADAH RUTIN ═══════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <h2
          className="text-lg md:text-xl font-bold text-center text-slate-900 mb-6"
          style={{ fontFamily: "'Courier New', Courier, monospace" }}
        >
          Jadwal Ibadah Rutin
        </h2>

        {/* ── Filter Row ─────────────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-2 items-center mb-4">
          {/* Dropdown */}
          <div className="relative">
            <select
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 border border-slate-400 text-sm text-slate-700 bg-white cursor-pointer focus:outline-none"
              style={{ minWidth: 160 }}
            >
              {KATEGORI_OPTIONS.map((k) => (
                <option key={k} value={k}>{k}</option>
              ))}
            </select>
            <svg
              className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* Input */}
          <input
            type="text"
            value={cari}
            onChange={(e) => setCari(e.target.value)}
            placeholder="Cari......"
            className="flex-1 min-w-[180px] px-3 py-2 border border-slate-400 text-sm text-slate-700 focus:outline-none"
          />

          {/* Tombol Search */}
          <button className="px-3 py-2 border border-slate-400 bg-slate-200 hover:bg-slate-300 transition">
            <svg className="w-4 h-4 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>

        {/* ── Tabel ──────────────────────────────────────────────────────── */}
        <div className="border border-slate-300 overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="border-b border-slate-300 bg-white">
              <tr>
                {['Hari', 'Jenis Ibadah', 'Waktu', 'Tempat'].map((h) => (
                  <th key={h} className="px-4 py-2 font-bold text-slate-800 text-xs">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {jadwalFiltered.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-4 py-6 text-center text-slate-400">
                    Tidak ada jadwal yang cocok.
                  </td>
                </tr>
              ) : (
                jadwalFiltered.map((item) => (
                  <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-2 text-slate-700">{item.hari}</td>
                    <td className="px-4 py-2 text-slate-700">{item.jenis}</td>
                    <td className="px-4 py-2 text-slate-700">{item.waktu}</td>
                    <td className="px-4 py-2 text-slate-700">{item.tempat}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Ruang kosong — persis Figma ada gap besar antara tabel & kegiatan */}
      <div className="h-24" />

      {/* ══ KEGIATAN KHUSUS / EVENT GEREJA ════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <h2
          className="text-lg md:text-xl font-bold text-center text-slate-900 mb-8"
          style={{ fontFamily: "'Courier New', Courier, monospace", letterSpacing: '0.06em' }}
        >
          Kegiatan Khusus/ Event Gereja
        </h2>

        <div className="space-y-5">
          {KEGIATAN_KHUSUS.map((item) => (
            <div
              key={item.id}
              className="border border-slate-300 bg-slate-100 p-6"
            >
              {/* Judul — italic bold Georgia, persis Figma */}
              <h3
                className="text-xl font-bold italic text-slate-900 mb-4"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                {item.judul}
              </h3>

              <p className="text-sm md:text-base mb-2">
                <strong className="font-bold italic">Tanggal</strong>
                <span className="italic"> : {item.tanggal}</span>
              </p>
              <p className="text-sm md:text-base mb-5">
                <strong className="font-bold italic">Deskripsi</strong>
                <span className="italic"> :  {item.deskripsi}</span>
              </p>

              {/* Tombol Detail — persis Figma: kotak border hitam */}
              <button
                onClick={() => setModal(item)}
                className="px-5 py-2 border border-slate-800 bg-white text-slate-800 text-sm font-semibold hover:bg-slate-800 hover:text-white transition-all duration-200"
              >
                Detail
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ══ CATATAN ═══════════════════════════════════════════════════════ */}
      <div className="py-10 text-center">
        <p className="text-slate-500 text-sm italic">
          Catatan : Jadwal dapat berubah sesuai pengumuman gereja
        </p>
      </div>

      {/* ══ MODAL DETAIL ══════════════════════════════════════════════════ */}
      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={() => setModal(null)}
        >
          <div
            className="bg-white shadow-2xl w-full max-w-md overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-slate-800 px-6 py-4 flex items-center justify-between">
              <h3
                className="text-lg font-bold italic text-white"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                {modal.judul}
              </h3>
              <button
                onClick={() => setModal(null)}
                className="text-white/70 hover:text-white transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4">
              <p className="text-sm">
                <strong className="font-bold italic">Tanggal</strong>
                <span className="italic text-slate-600"> : {modal.tanggal}</span>
              </p>
              <p className="text-sm">
                <strong className="font-bold italic">Deskripsi</strong>
                <span className="italic text-slate-600"> :  {modal.deskripsi}</span>
              </p>
              <div className="bg-slate-50 border border-slate-200 p-4">
                <p className="text-sm font-semibold text-slate-700 mb-2">Detail Kegiatan:</p>
                <p className="text-sm text-slate-600 leading-relaxed">{modal.detail}</p>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 pb-6 flex justify-end gap-3">
              <button
                onClick={() => setModal(null)}
                className="px-5 py-2 text-sm font-semibold border border-slate-400 text-slate-600 hover:bg-slate-100 transition"
              >
                Tutup
              </button>
              <button className="px-5 py-2 text-sm font-bold text-white bg-slate-800 hover:bg-slate-700 transition">
                Daftar Sekarang
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JadwalPage;