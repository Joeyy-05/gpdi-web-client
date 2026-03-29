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

      {/* ══ FOOTER ═════════════════════════════════════════════════════════ */}
      <footer className="font-sans mt-auto">
        {/* Kotak abu */}
        <div className="bg-gray-100 border-t border-gray-200 py-8 px-4 text-center">
          <p className="font-bold text-slate-900 text-sm mb-1">GPdI Sibulele</p>
          <p className="font-bold text-slate-900 text-sm mb-4">
            Jalan Contoh No.123, Kota A, Provinsi A, 12345
          </p>
          <div className="flex justify-center items-center gap-5 mb-4">
            {/* Facebook */}
            <a href="#" aria-label="Facebook" className="hover:opacity-80 transition-opacity">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="36" height="36" rx="6" fill="#1877F2"/>
                <path d="M24 18C24 14.686 21.314 12 18 12C14.686 12 12 14.686 12 18C12 20.988 14.123 23.472 16.969 23.924V19.781H15.43V18H16.969V16.66C16.969 15.14 17.861 14.313 19.244 14.313C19.908 14.313 20.602 14.43 20.602 14.43V15.924H19.836C19.081 15.924 18.844 16.395 18.844 16.879V18H20.531L20.262 19.781H18.844V23.924C21.69 23.472 24 20.988 24 18Z" fill="white"/>
              </svg>
            </a>
            {/* Instagram */}
            <a href="#" aria-label="Instagram" className="hover:opacity-80 transition-opacity">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient id="ig-grad-j" cx="30%" cy="107%" r="120%">
                    <stop offset="0%"  stopColor="#fdf497"/>
                    <stop offset="5%"  stopColor="#fdf497"/>
                    <stop offset="45%" stopColor="#fd5949"/>
                    <stop offset="60%" stopColor="#d6249f"/>
                    <stop offset="90%" stopColor="#285AEB"/>
                  </radialGradient>
                </defs>
                <rect width="36" height="36" rx="8" fill="url(#ig-grad-j)"/>
                <rect x="11" y="11" width="14" height="14" rx="4" stroke="white" strokeWidth="1.8" fill="none"/>
                <circle cx="18" cy="18" r="3.5" stroke="white" strokeWidth="1.8" fill="none"/>
                <circle cx="22.3" cy="13.7" r="1" fill="white"/>
              </svg>
            </a>
            {/* YouTube */}
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
        {/* Baris putih bawah */}
        <div className="bg-white py-4 px-4 text-center border-t border-gray-100">
          <p className="text-slate-700 text-sm">
            &copy; 2026 GPdI Jemaat Sibulele. All Rights Reserved.
          </p>
        </div>
      </footer>

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