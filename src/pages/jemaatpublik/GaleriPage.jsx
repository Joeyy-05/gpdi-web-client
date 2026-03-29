import React, { useState } from 'react';

// ─── DATA STATIS (ganti dengan API call nantinya) ────────────────────────────
const GALERI_DATA = [
  { id: 1,  judul: 'Ibadah Raya Minggu',        tanggal: '05 Januari 2025',   kategori: 'Ibadah Raya' },
  { id: 2,  judul: 'Perayaan Natal Bersama',    tanggal: '25 Desember 2024',  kategori: 'Event Gereja' },
  { id: 3,  judul: 'Retreat Pemuda 2024',        tanggal: '10 Juli 2024',      kategori: 'Pemuda' },
  { id: 4,  judul: 'Bakti Sosial Agustus',      tanggal: '15 Agustus 2024',   kategori: 'Sosial' },
  { id: 5,  judul: 'Ibadah Pemuda & Remaja',    tanggal: '20 September 2024', kategori: 'Pemuda' },
  { id: 6,  judul: 'Sekolah Minggu Spesial',    tanggal: '12 Oktober 2024',   kategori: 'Sekolah Minggu' },
  { id: 7,  judul: 'Ibadah Doa Rabu',           tanggal: '02 November 2024',  kategori: 'Ibadah Raya' },
  { id: 8,  judul: 'Konser Pujian & Penyembahan', tanggal: '16 November 2024', kategori: 'Event Gereja' },
  { id: 9,  judul: 'Ibadah Wanita Desember',    tanggal: '07 Desember 2024',  kategori: 'Ibadah Raya' },
  { id: 10, judul: 'Kunjungan Kasih Rayon',     tanggal: '21 Desember 2024',  kategori: 'Sosial' },
  { id: 11, judul: 'Ibadah Tahun Baru 2025',    tanggal: '01 Januari 2025',   kategori: 'Event Gereja' },
  { id: 12, judul: 'Sekolah Minggu Januari',    tanggal: '19 Januari 2025',   kategori: 'Sekolah Minggu' },
];

const KATEGORI_OPTIONS = [
  'Semua Kegiatan',
  'Ibadah Raya',
  'Pemuda',
  'Sekolah Minggu',
  'Event Gereja',
  'Sosial',
];

const PER_PAGE = 6;

// ─── FOOTER INLINE ───────────────────────────────────────────────────────────
const Footer = () => (
  <footer className="font-sans mt-auto">
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
              <radialGradient id="ig-grad-g" cx="30%" cy="107%" r="120%">
                <stop offset="0%"  stopColor="#fdf497"/>
                <stop offset="5%"  stopColor="#fdf497"/>
                <stop offset="45%" stopColor="#fd5949"/>
                <stop offset="60%" stopColor="#d6249f"/>
                <stop offset="90%" stopColor="#285AEB"/>
              </radialGradient>
            </defs>
            <rect width="36" height="36" rx="8" fill="url(#ig-grad-g)"/>
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
    <div className="bg-white py-4 px-4 text-center border-t border-gray-100">
      <p className="text-slate-700 text-sm">
        &copy; 2026 GPdI Jemaat Sibulele. All Rights Reserved.
      </p>
    </div>
  </footer>
);

// ─── KOMPONEN UTAMA ──────────────────────────────────────────────────────────
const GaleriPage = () => {
  const [kategori, setKategori]       = useState('Semua Kegiatan');
  const [cari, setCari]               = useState('');
  const [inputCari, setInputCari]     = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [halaman, setHalaman]         = useState(1);

  // Filter
  const dataFiltered = GALERI_DATA.filter((item) => {
    const matchKat  = kategori === 'Semua Kegiatan' || item.kategori === kategori;
    const q         = cari.toLowerCase();
    const matchCari =
      item.judul.toLowerCase().includes(q) ||
      item.tanggal.toLowerCase().includes(q) ||
      item.kategori.toLowerCase().includes(q);
    return matchKat && matchCari;
  });

  // Pagination
  const totalHalaman = Math.max(1, Math.ceil(dataFiltered.length / PER_PAGE));
  const halamanAman  = Math.min(halaman, totalHalaman);
  const dataHalaman  = dataFiltered.slice((halamanAman - 1) * PER_PAGE, halamanAman * PER_PAGE);

  const gantiHalaman = (h) => {
    setHalaman(Math.max(1, Math.min(h, totalHalaman)));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCari = () => {
    setCari(inputCari);
    setHalaman(1);
  };

  const handleKategori = (k) => {
    setKategori(k);
    setDropdownOpen(false);
    setHalaman(1);
  };

  // Buat array nomor halaman yang ditampilkan (maks 5)
  const pagesShown = () => {
    const pages = [];
    let start = Math.max(1, halamanAman - 2);
    let end   = Math.min(totalHalaman, start + 4);
    if (end - start < 4) start = Math.max(1, end - 4);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  return (
    <div className="font-sans bg-white min-h-screen">

      {/* ══ JUDUL ══════════════════════════════════════════════════════════ */}
      <div className="bg-white pt-10 pb-3 text-center px-4">
        <h1
          className="text-3xl md:text-4xl font-bold text-slate-900"
          style={{ fontFamily: "'Courier New', Courier, monospace" }}
        >
          Galeri Kegiatan
        </h1>
        <p className="text-slate-500 mt-2 text-sm md:text-base">
          Dokumentasi Ibadah dan Aktivitas Jemaat
        </p>
      </div>

      {/* ══ PLACEHOLDER AYAT / BANNER ══════════════════════════════════════ */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-5">
        <div className="w-full h-52 md:h-64 bg-gray-200 flex items-center justify-center border border-gray-200">
          <span className="text-gray-500 text-sm">Placeholder (Ayat )</span>
        </div>
      </div>

      {/* ══ GARIS PEMISAH ══════════════════════════════════════════════════ */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <hr className="border-slate-300" />
      </div>

      {/* ══ FILTER BAR ═════════════════════════════════════════════════════ */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-6">
        <div className="flex flex-wrap gap-3 justify-center items-center">

          {/* Dropdown Kategori */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 pl-4 pr-3 py-2.5 border-2 border-slate-700 bg-white text-sm text-slate-800 font-medium min-w-[180px] justify-between focus:outline-none"
            >
              <span>{kategori}</span>
              <svg
                className={`w-4 h-4 text-slate-600 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {dropdownOpen && (
              <div className="absolute top-full left-0 z-30 w-full bg-white border border-slate-300 shadow-lg">
                {KATEGORI_OPTIONS.map((k) => (
                  <button
                    key={k}
                    onClick={() => handleKategori(k)}
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
            value={inputCari}
            onChange={(e) => setInputCari(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCari()}
            placeholder="Cari Kegiatan..."
            className="flex-1 min-w-[200px] max-w-sm px-4 py-2.5 border-2 border-slate-700 text-sm text-slate-700 focus:outline-none"
          />

          {/* Tombol Cari */}
          <button
            onClick={handleCari}
            className="px-6 py-2.5 border-2 border-slate-700 bg-white text-slate-800 text-sm font-semibold hover:bg-slate-800 hover:text-white transition-all duration-200"
          >
            Cari
          </button>
        </div>
      </div>

      {/* ══ GRID GALERI ════════════════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        {dataHalaman.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            Tidak ada kegiatan yang cocok.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {dataHalaman.map((item) => (
              <div
                key={item.id}
                className="bg-[#0a1172] overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
              >
                {/* Placeholder Gambar */}
                <div className="w-full h-44 bg-white/10 border-4 border-white/20 m-3"
                     style={{ width: 'calc(100% - 24px)' }}>
                  {/* Nanti ganti dengan <img src={item.foto} ... /> */}
                </div>

                {/* Keterangan */}
                <div className="px-3 pb-4 text-center">
                  <p className="text-white text-sm font-semibold">{item.judul}</p>
                  <p className="text-white/80 text-xs mt-0.5">{item.tanggal}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ══ PAGINATION ═════════════════════════════════════════════════════ */}
      {totalHalaman > 1 && (
        <div className="flex justify-center items-center gap-1 py-8 flex-wrap">

          {/* << Prev */}
          <button
            onClick={() => gantiHalaman(halamanAman - 1)}
            disabled={halamanAman === 1}
            className={`px-4 py-2 border border-slate-400 text-sm font-medium transition ${
              halamanAman === 1
                ? 'text-slate-300 border-slate-200 cursor-not-allowed'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            &lt;&lt;
          </button>

          {/* Nomor Halaman */}
          {pagesShown().map((p) => (
            <button
              key={p}
              onClick={() => gantiHalaman(p)}
              className={`w-9 h-9 border text-sm font-medium transition ${
                p === halamanAman
                  ? 'bg-slate-800 text-white border-slate-800'
                  : 'border-slate-400 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {p}
            </button>
          ))}

          {/* Ellipsis jika ada halaman tersembunyi */}
          {pagesShown()[pagesShown().length - 1] < totalHalaman && (
            <span className="w-9 h-9 flex items-center justify-center text-slate-500 text-sm">
              ...
            </span>
          )}

          {/* >> Next */}
          <button
            onClick={() => gantiHalaman(halamanAman + 1)}
            disabled={halamanAman === totalHalaman}
            className={`px-4 py-2 border border-slate-400 text-sm font-medium transition ${
              halamanAman === totalHalaman
                ? 'text-slate-300 border-slate-200 cursor-not-allowed'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            &gt;&gt;
          </button>
        </div>
      )}

      {/* Spacer */}
      <div className="h-6" />

      {/* ══ FOOTER ═════════════════════════════════════════════════════════ */}
      <Footer />

      {/* Tutup dropdown jika klik di luar */}
      {dropdownOpen && (
        <div className="fixed inset-0 z-20" onClick={() => setDropdownOpen(false)} />
      )}
    </div>
  );
};

export default GaleriPage;