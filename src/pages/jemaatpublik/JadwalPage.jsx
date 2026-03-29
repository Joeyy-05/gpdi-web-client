import React, { useState } from "react";
import { homeData } from "../../data/homeData";
import { KEGIATAN_KHUSUS, KATEGORI_OPTIONS } from "../../data/jadwalData";

// ─── KOMPONEN UTAMA ──────────────────────────────────────────────────────────
const JadwalPage = () => {
  const [kategori, setKategori] = useState("Semua Kegiatan");
  const [cari, setCari] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Filter tabel
  const jadwalFiltered = homeData.jadwalDetail.filter((item) => {
    const matchKat = kategori === "Semua Kegiatan" || item.nama === kategori;
    const q = cari.toLowerCase();
    const matchCari =
      item.hari.toLowerCase().includes(q) ||
      item.nama.toLowerCase().includes(q) ||
      item.tempat.toLowerCase().includes(q);
    return matchKat && matchCari;
  });

  return (
    <div
      className="bg-white min-h-screen"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      {/* ══ JUDUL HALAMAN ══════════════════════════════════════════════════ */}
      <div className="bg-white pt-14 pb-4 text-center px-4">
        <h1 className="text-[44px] font-extrabold tracking-[0.06em] text-[#0D1282]">
          Jadwal Ibadah &amp; Kegiatan
        </h1>
        <p className="mt-4 text-[18px] text-gray-600">
          Informasi Jadwal Ibadah Rutin dan Kegiatan Gereja
        </p>
      </div>

      {/* ══ PLACEHOLDER FOTO GEDUNG ════════════════════════════════════════ */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <div className="w-full h-52 md:h-72 bg-gray-200 overflow-hidden rounded-xl border border-gray-300">
          <img
            src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=1440&auto=format&fit=crop"
            alt="Gedung Gereja"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* ══ GARIS PEMISAH ══════════════════════════════════════════════════ */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <hr className="border-slate-300" />
      </div>

      {/* ══ JADWAL IBADAH RUTIN ════════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-[#0D1282] mb-8">
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
                className={`w-4 h-4 text-slate-500 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Daftar Dropdown */}
            {dropdownOpen && (
              <div className="absolute top-full left-0 z-30 w-52 bg-white border border-slate-300 shadow-md">
                {KATEGORI_OPTIONS.map((k) => (
                  <button
                    key={k}
                    onClick={() => {
                      setKategori(k);
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-100 transition ${
                      kategori === k
                        ? "bg-slate-100 font-semibold text-slate-900"
                        : "text-slate-700"
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
            <svg
              className="w-4 h-4 text-slate-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>

        {/* ── Tabel ──────────────────────────────────────────────────────── */}
        <div className="border border-slate-300 overflow-x-auto rounded-lg">
          <table className="w-full text-left">
            <thead className="border-b border-slate-300 bg-[#F9F9F9]">
              <tr>
                {["Hari", "Nama Ibadah", "Waktu", "Tempat"].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-4 font-bold text-[#0D1282] text-sm uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {jadwalFiltered.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-4 py-6 text-center text-slate-400"
                  >
                    Tidak ada jadwal yang cocok.
                  </td>
                </tr>
              ) : (
                jadwalFiltered.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-slate-100 hover:bg-blue-50/30 transition-colors"
                  >
                    <td className="px-6 py-4 text-slate-800 font-semibold">
                      {item.hari}
                    </td>
                    <td className="px-6 py-4 text-slate-700">{item.nama}</td>
                    <td className="px-6 py-4 text-slate-700">{item.jam}</td>
                    <td className="px-6 py-4 text-slate-700">{item.tempat}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* ══ KEGIATAN KHUSUS / EVENT GEREJA ════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-[#0D1282] mb-10 uppercase tracking-widest">
          Kegiatan Khusus / Event Gereja
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {KEGIATAN_KHUSUS.map((item) => (
            <div
              key={item.id}
              className="flex flex-col overflow-hidden border border-slate-200 bg-[#F9F9F9] rounded-2xl shadow-sm hover:shadow-md transition-all"
            >
              <div className="h-52 w-full overflow-hidden bg-gray-200">
                <img
                  src={item.gambar}
                  alt={item.judul}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-8 flex flex-col flex-1">
                <h3 className="text-2xl font-bold text-[#0D1282] mb-4">
                  {item.judul}
                </h3>

                <p className="text-base mb-2 text-gray-700">
                  <strong className="font-bold text-[#D71313]">Tanggal</strong>
                  <span> : {item.tanggal}</span>
                </p>
                <p className="text-base mb-6 text-gray-600 italic flex-1">
                  "{item.deskripsiSingkat}"
                </p>

                <button
                  onClick={() => setSelectedEvent(item)}
                  className="w-fit px-8 py-2.5 rounded-lg bg-[#0D1282] text-white text-sm font-bold hover:bg-[#0a0e66] transition-all duration-200 shadow-sm"
                >
                  Lihat Detail
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ CATATAN ════════════════════════════════════════════════════════ */}
      <div className="pb-20 text-center">
        <p className="text-gray-400 text-sm italic">
          Catatan : Jadwal dapat berubah sesuai pengumuman gereja
        </p>
      </div>

      {/* ══ MODAL DETAIL KEGIATAN ══════════════════════════════════════════ */}
      {selectedEvent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-[750px] max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute right-6 top-6 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-md transition hover:bg-red-500 hover:text-white"
            >
              ✕
            </button>

            <div className="h-[300px] w-full overflow-hidden bg-gray-100">
              <img
                src={selectedEvent.gambar}
                alt={selectedEvent.judul}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="p-10 pt-8">
              <span className="rounded-full bg-[#0D1282]/10 px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#0D1282]">
                Detail Kegiatan Khusus
              </span>

              <h2 className="mt-4 text-3xl font-extrabold text-[#0D1282]">
                {selectedEvent.judul}
              </h2>

              <p className="mt-2 text-lg font-bold text-[#D71313]">
                📅 {selectedEvent.tanggal}
              </p>

              <div className="mt-8 border-t border-gray-100 pt-8">
                <p className="text-lg leading-[1.8] text-gray-700 whitespace-pre-line">
                  {selectedEvent.deskripsiLengkap}
                </p>
              </div>
              <div className="mt-10 flex justify-end border-t border-gray-100 pt-6">
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="rounded-lg bg-gray-100 px-8 py-2.5 text-sm font-bold text-gray-500 transition hover:bg-red-50 hover:text-red-500"
                >
                  Tutup Detail
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
