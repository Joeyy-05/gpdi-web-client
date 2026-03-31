import React, { useState, useEffect, useMemo } from "react";
import { getPublicWorship, getPublicActivity } from "../../services/eventService";

// PERBAIKAN: Kategori disesuaikan persis dengan yang ada di Admin & Backend
const KATEGORI_OPTIONS = [
  "Semua Kegiatan",
  "Ibadah Raya Minggu",
  "Ibadah Sekolah Minggu",
  "Ibadah Pemuda & Remaja",
  "Ibadah Wanita (Pelwap)",
  "Doa Malam Jemaat"
];

const JadwalPage = () => {
  const [kategori, setKategori] = useState("Semua Kegiatan");
  const [cari, setCari] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // State Dinamis dari Backend
  const [jadwalIbadah, setJadwalIbadah] = useState([]);
  const [kegiatanKhusus, setKegiatanKhusus] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [resWorship, resActivity] = await Promise.all([
          getPublicWorship(),
          getPublicActivity()
        ]);
        setJadwalIbadah(resWorship.data || []);
        setKegiatanKhusus(resActivity.data || []);
      } catch (error) {
        console.error("Gagal memuat data jadwal:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter tabel ibadah rutin
  const jadwalFiltered = useMemo(() => {
    return jadwalIbadah.filter((item) => {
      const namaKategori = item.category || item.nama_ibadah || item.nama || "";
      const matchKat = kategori === "Semua Kegiatan" || namaKategori === kategori;
      
      const q = cari.toLowerCase();
      const hari = (item.day_of_week || item.hari || "").toLowerCase();
      const tempat = (item.location || item.tempat || "").toLowerCase();
      
      const matchCari =
        hari.includes(q) ||
        namaKategori.toLowerCase().includes(q) ||
        tempat.includes(q);
        
      return matchKat && matchCari;
    });
  }, [jadwalIbadah, kategori, cari]);

  return (
    <div className="bg-white min-h-screen" style={{ fontFamily: "Montserrat, sans-serif" }}>
      {/* ══ JUDUL HALAMAN ══════════════════════════════════════════════════ */}
      <div className="bg-white pt-14 pb-4 text-center px-4">
        <h1 className="text-[44px] font-extrabold tracking-[0.06em] text-[#0D1282]">
          Jadwal Ibadah &amp; Kegiatan
        </h1>
        <p className="mt-4 text-[18px] text-gray-600">
          Informasi Jadwal Ibadah Rutin dan Kegiatan Gereja
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <div className="w-full h-52 md:h-72 bg-gray-200 overflow-hidden rounded-xl border border-gray-300">
          <img
            src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=1440&auto=format&fit=crop"
            alt="Gedung Gereja"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <hr className="border-slate-300" />
      </div>

      {/* ══ JADWAL IBADAH RUTIN (Tabel) ════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-[#0D1282] mb-8">
          Jadwal Ibadah Rutin
        </h2>

        <div className="flex flex-wrap gap-2 items-center mb-4 relative z-30">
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 pl-3 pr-2 py-2 border border-slate-400 bg-white text-sm text-slate-700 min-w-[210px] justify-between focus:outline-none"
            >
              <span className="font-semibold">{kategori}</span>
              <svg className={`w-4 h-4 text-slate-500 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
            </button>
            {dropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white border border-slate-300 shadow-lg rounded-md overflow-hidden z-20">
                {KATEGORI_OPTIONS.map((k) => (
                  <button key={k} onClick={() => { setKategori(k); setDropdownOpen(false); }} className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-100 transition ${ kategori === k ? "bg-slate-100 font-bold text-[#0D1282]" : "text-slate-700" }`}>
                    {k}
                  </button>
                ))}
              </div>
            )}
          </div>

          <input type="text" value={cari} onChange={(e) => setCari(e.target.value)} placeholder="Cari Hari/Tempat..." className="flex-1 min-w-[180px] px-3 py-2 border border-slate-400 text-sm text-slate-700 focus:outline-none focus:border-[#0D1282]"/>
        </div>

        <div className="border border-slate-300 overflow-x-auto rounded-lg shadow-sm">
          <table className="w-full text-left">
            <thead className="border-b border-slate-300 bg-[#F9F9F9]">
              <tr>
                {["Hari", "Kategori Ibadah", "Waktu", "Tempat"].map((h) => (
                  <th key={h} className="px-6 py-4 font-bold text-[#0D1282] text-sm uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="4" className="px-4 py-8 text-center text-slate-500 font-semibold animate-pulse">Memuat jadwal ibadah...</td></tr>
              ) : jadwalFiltered.length === 0 ? (
                <tr><td colSpan="4" className="px-4 py-8 text-center text-red-500 font-semibold">Tidak ada jadwal ibadah yang ditemukan.</td></tr>
              ) : (
                jadwalFiltered.map((item) => (
                  <tr key={item.id} className="border-b border-slate-100 hover:bg-blue-50/50 transition-colors">
                    <td className="px-6 py-4 text-slate-800 font-bold">{item.day_of_week || item.hari}</td>
                    <td className="px-6 py-4 text-[#0D1282] font-semibold">{item.category || item.nama_ibadah || item.nama}</td>
                    <td className="px-6 py-4 text-slate-700 font-medium">{item.start_time || item.jam} WIB</td>
                    <td className="px-6 py-4 text-slate-700">{item.location || item.tempat}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* ══ KEGIATAN KHUSUS / EVENT GEREJA (Card) ═════════════════════════ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-[#0D1282] mb-10 uppercase tracking-widest">
          Kegiatan Khusus / Event
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {loading ? (
             <p className="col-span-full text-center text-gray-500 animate-pulse font-semibold">Memuat kegiatan khusus...</p>
          ) : kegiatanKhusus.length === 0 ? (
             <p className="col-span-full text-center text-gray-400 py-10 border border-dashed border-gray-300 rounded-lg">Tidak ada event khusus dalam waktu dekat.</p>
          ) : (
            kegiatanKhusus.map((item) => (
              <div key={item.id} className="flex flex-col overflow-hidden border border-slate-200 bg-[#F9F9F9] rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="h-52 w-full overflow-hidden bg-gray-200 relative">
                  <img
                      src={item.gambar ? `http://localhost:8003/storage/${item.gambar}` : "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800"}
                      alt={item.judul || item.title || item.nama_kegiatan}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 bg-[#D71313] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                     EVENT KHUSUS
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-2xl font-bold text-[#0D1282] mb-4 line-clamp-2">{item.judul || item.title || item.nama_kegiatan}</h3>
                  <p className="text-base mb-2 text-gray-700">
                    <strong className="font-bold text-[#D71313]">Tanggal</strong>
                    <span> : {item.event_date ? new Date(item.event_date).toLocaleDateString('id-ID', {day: '2-digit', month: 'long', year:'numeric'}) : '-'}</span>
                  </p>
                  <p className="text-base mb-6 text-gray-600 italic flex-1 line-clamp-3">
                    "{item.description || item.deskripsi}"
                  </p>
                  <button onClick={() => setSelectedEvent(item)} className="w-fit px-8 py-2.5 rounded-lg bg-[#0D1282] text-white text-sm font-bold hover:bg-[#D71313] transition-colors shadow-sm">
                    Lihat Detail
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* ══ MODAL DETAIL KEGIATAN ══════════════════════════════════════════ */}
      {selectedEvent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-[750px] max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <button onClick={() => setSelectedEvent(null)} className="absolute right-6 top-6 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-md transition hover:bg-[#D71313]">✕</button>
            <div className="h-[300px] w-full overflow-hidden bg-gray-100">
              <img 
                  src={selectedEvent.gambar ? `http://localhost:8003/storage/${selectedEvent.gambar}` : "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800"} 
                  alt="Event" 
                  className="h-full w-full object-cover"
              />
            </div>
            <div className="p-10 pt-8">
              <span className="rounded-full bg-[#0D1282]/10 px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#0D1282]">
                Detail Event
              </span>
              <h2 className="mt-4 text-3xl font-extrabold text-[#0D1282]">{selectedEvent.judul || selectedEvent.title || selectedEvent.nama_kegiatan}</h2>
              <p className="mt-2 text-lg font-bold text-[#D71313]">
                📅 {selectedEvent.event_date ? new Date(selectedEvent.event_date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : '-'}
              </p>
              <div className="mt-8 border-t border-gray-200 pt-8">
                <p className="text-lg leading-[1.8] text-gray-700 whitespace-pre-wrap">{selectedEvent.description || selectedEvent.deskripsi}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {dropdownOpen && <div className="fixed inset-0 z-20" onClick={() => setDropdownOpen(false)} />}
    </div>
  );
};

export default JadwalPage;