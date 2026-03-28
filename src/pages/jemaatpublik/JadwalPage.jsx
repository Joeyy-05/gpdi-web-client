import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ─── DATA STATIS (ganti dengan API call nantinya) ────────────────────────────
const JADWAL_RUTIN = [
  { id: 1, hari: 'Minggu', jenis: 'Ibadah Raya',           waktu: '10:00', tempat: 'Gedung Utama' },
  { id: 2, hari: 'Rabu',   jenis: 'Ibadah Puasa',          waktu: '19:00', tempat: 'Aula Gereja'  },
  { id: 3, hari: 'Jumat',  jenis: 'Ibadah Pemuda Remaja',  waktu: '18:30', tempat: 'Gedung Utama' },
  { id: 4, hari: 'Sabtu',  jenis: 'Ibadah Rayon Kota',     waktu: '09:00', tempat: 'Ruang Kelas'  },
];

// Kategori dropdown — sesuai Figma (gambar 1)
const KATEGORI_OPTIONS = [
  'Semua Kegiatan',
  'Ibadah Raya',
  'Ibadah Pemuda Remaja',
  'Ibadah Puasa',
  'Ibadah Rayon Kota',
  'Event Gereja',
];

export const KEGIATAN_KHUSUS = [
  {
    id: 1,
    slug: 'perayaan-natal-bersama',
    judul: 'Perayaan Natal Bersama',
    tanggal: '25 Desember 2024',
    deskripsiSingkat: 'Ibadah perayaan Natal bersama seluruh jemaat dan keluarga.',
    deskripsiLengkap: `Dengan penuh sukacita, kami mengundang Bapak/Ibu, Saudara/i, serta seluruh jemaat untuk hadir dan bersama-sama merayakan Ibadah Perayaan Natal. Marilah kita datang dengan hati yang bersyukur untuk memuliakan Tuhan dan merayakan kelahiran Yesus Kristus sebagai Juruselamat dalam suasana penuh kasih, damai, dan pengharapan.

Hari/Tanggal : 25 Desember
Pukul : 20.00 WIB
Tempat : Gereja GPdI

Kiranya kehadiran kita semua menjadi berkat dan mempererat persekutuan iman.`,
  },
  {
    id: 2,
    slug: 'retreat-pemuda',
    judul: 'Retreat Pemuda',
    tanggal: '10-12 Juli 2025',
    deskripsiSingkat: 'Retreat rohani untuk pemuda gereja di luar kota.',
    deskripsiLengkap: `Program retreat selama 3 hari 2 malam di Pusat Retret Bukit Doa, Puncak. Diisi dengan sesi firman Tuhan, outbound rohani, dan persekutuan antar pemuda gereja.

Hari/Tanggal : 10–12 Juli 2025
Tempat : Pusat Retret Bukit Doa, Puncak
Biaya : Rp 350.000/orang

Pendaftaran dibuka hingga 30 Juni 2025. Segera daftarkan diri Anda ke sekretariat gereja.`,
  },
  {
    id: 3,
    slug: 'bakti-sosial',
    judul: 'Bakti Sosial',
    tanggal: '15 Agustus 2025',
    deskripsiSingkat: 'Kegiatan sosial membantu masyarakat yang membutuhkan.',
    deskripsiLengkap: `Kegiatan bakti sosial meliputi pembagian sembako, pengobatan gratis, dan penyuluhan kesehatan untuk warga sekitar gereja.

Hari/Tanggal : 15 Agustus 2025
Tempat : Halaman Gereja GPdI dan sekitarnya
Waktu : 08.00 WIB – selesai

Jemaat yang ingin turut berpartisipasi sebagai relawan dapat mendaftar ke sekretariat gereja paling lambat 10 Agustus 2025.`,
  },
];

// ─── KOMPONEN UTAMA ──────────────────────────────────────────────────────────
const JadwalPage = () => {
  const navigate             = useNavigate();
  const [kategori, setKategori] = useState('Semua Kegiatan');
  const [cari, setCari]         = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Filter tabel
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

      {/* ══ GARIS PEMISAH ══════════════════════════════════════════════════ */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <hr className="border-slate-300" />
      </div>

      {/* ══ JADWAL IBADAH RUTIN ════════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <h2
          className="text-lg md:text-xl font-bold text-center text-slate-900 mb-6"
          style={{ fontFamily: "'Courier New', Courier, monospace" }}
        >
          Jadwal Ibadah Rutin
        </h2>

        {/* ── Filter Row ─────────────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-2 items-center mb-4">

          {/* Dropdown Kategori — custom agar mirip Figma */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 pl-3 pr-2 py-2 border border-slate-400 bg-white text-sm text-slate-700 min-w-[165px] justify-between focus:outline-none"
            >
              <span>{kategori}</span>
              <svg
                className={`w-4 h-4 text-slate-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Daftar Dropdown */}
            {dropdownOpen && (
              <div className="absolute top-full left-0 z-30 w-52 bg-white border border-slate-300 shadow-md">
                {KATEGORI_OPTIONS.map((k) => (
                  <button
                    key={k}
                    onClick={() => { setKategori(k); setDropdownOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-100 transition ${
                      kategori === k ? 'bg-slate-100 font-semibold text-slate-900' : 'text-slate-700'
                    }`}
                  >
                    {k}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input Cari */}
          <input
            type="text"
            value={cari}
            onChange={(e) => setCari(e.target.value)}
            placeholder="Cari......"
            className="flex-1 min-w-[180px] px-3 py-2 border border-slate-400 text-sm text-slate-700 focus:outline-none"
          />

          {/* Tombol Search */}
          <button
            onClick={() => setDropdownOpen(false)}
            className="px-3 py-2 border border-slate-400 bg-slate-200 hover:bg-slate-300 transition"
          >
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
                  <th key={h} className="px-4 py-2 font-bold text-slate-800 text-xs uppercase">
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

      {/* Gap besar antara tabel dan kegiatan khusus — persis Figma */}
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
              {/* Judul italic bold Georgia */}
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
                <span className="italic"> :  {item.deskripsiSingkat}</span>
              </p>

              {/* Tombol Detail → navigasi ke halaman detail */}
              <button
                onClick={() => navigate(`/jadwal/${item.slug}`)}
                className="px-5 py-2 border border-slate-800 bg-white text-slate-800 text-sm font-semibold hover:bg-slate-800 hover:text-white transition-all duration-200"
              >
                Detail
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ══ CATATAN ════════════════════════════════════════════════════════ */}
      <div className="py-10 text-center">
        <p className="text-slate-500 text-sm italic">
          Catatan : Jadwal dapat berubah sesuai pengumuman gereja
        </p>
      </div>

      {/* Tutup dropdown jika klik di luar */}
      {dropdownOpen && (
        <div
          className="fixed inset-0 z-20"
          onClick={() => setDropdownOpen(false)}
        />
      )}
    </div>
  );
};

export default JadwalPage;