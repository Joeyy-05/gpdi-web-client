import React, { useState, useEffect, useMemo } from "react";
import { CalendarDays, ChevronDown, Search, X } from "lucide-react";
import {
  getPublicWorship,
  getPublicActivity,
} from "../../services/eventService";
import { eventStorageUrl } from "../../config/mediaUrls";

// PERBAIKAN: Kategori disesuaikan persis dengan yang ada di Admin & Backend
const KATEGORI_OPTIONS = [
  "Semua Kegiatan",
  "Ibadah Raya Minggu",
  "Ibadah Sekolah Minggu",
  "Ibadah Pemuda & Remaja",
  "Ibadah Wanita (Pelwap)",
  "Doa Malam Jemaat",
];

const scheduleHeroImage =
  "https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=85&w=1800&auto=format&fit=crop";

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
          getPublicActivity(),
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
      const matchKat =
        kategori === "Semua Kegiatan" || namaKategori === kategori;

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
    <div
      className="min-h-screen bg-[#f7f8fb]"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      {/* ══ JUDUL HALAMAN ══════════════════════════════════════════════════ */}
      <div className="px-5 pb-4 pt-16 text-center sm:px-8 lg:px-12">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D71313]">
          Rencanakan kehadiran
        </p>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[#0D1282] sm:text-6xl">
          Jadwal Ibadah &amp; Kegiatan
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
          Informasi Jadwal Ibadah Rutin dan Kegiatan Gereja
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-7xl px-5 sm:px-8 lg:px-12">
        <section className="grid overflow-hidden rounded-2xl bg-[#0D1282] shadow-xl shadow-blue-950/15 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="flex flex-col justify-between p-7 text-white sm:p-10">
            <div>
              <CalendarDays size={28} className="text-blue-200" />
              <p className="mt-10 text-xs font-bold uppercase tracking-[0.2em] text-blue-200">
                Rencanakan waktu bersekutu
              </p>
              <h2 className="mt-3 max-w-md text-3xl font-extrabold leading-tight sm:text-4xl">
                Hadir, bersekutu, dan bertumbuh bersama.
              </h2>
              <p className="mt-5 max-w-md text-sm leading-6 text-blue-100 sm:text-base">
                Lihat jadwal ibadah rutin dan kegiatan khusus GPdI Sibulele
                dalam satu tempat.
              </p>
            </div>
            <p className="mt-10 text-sm font-semibold text-red-200">
              Jadwal diperbarui oleh pengurus gereja.
            </p>
          </div>
          <div className="relative min-h-[250px] overflow-hidden sm:min-h-[330px]">
            <img
              src={scheduleHeroImage}
              alt="Ruang ibadah GPdI Sibulele"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0D1282]/45 via-transparent to-transparent" />
          </div>
        </section>
      </div>

      {/* ══ JADWAL IBADAH RUTIN (Tabel) ════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-5 pb-4 pt-20 sm:px-8 lg:px-12">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D71313]">
              Setiap minggu
            </p>
            <h2 className="mt-2 text-3xl font-extrabold text-[#0D1282]">
              Jadwal ibadah rutin
            </h2>
          </div>
          <CalendarDays className="hidden text-[#0D1282] sm:block" size={28} />
        </div>
        <div className="flex flex-wrap gap-2 items-center mb-4 relative z-30">
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex min-w-[210px] items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:outline-none"
            >
              <span className="font-semibold">{kategori}</span>
              <ChevronDown
                size={16}
                className={`text-slate-500 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
              />
            </button>
            {dropdownOpen && (
              <div className="absolute left-0 top-full z-20 mt-1 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
                {KATEGORI_OPTIONS.map((k) => (
                  <button
                    key={k}
                    onClick={() => {
                      setKategori(k);
                      setDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-3 text-left text-sm transition hover:bg-slate-50 ${kategori === k ? "bg-blue-50 font-bold text-[#0D1282]" : "text-slate-700"}`}
                  >
                    {k}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative min-w-[220px] flex-1">
            <Search
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={cari}
              onChange={(e) => setCari(e.target.value)}
              placeholder="Cari Hari/Tempat..."
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pl-11 text-sm text-slate-700 shadow-sm focus:outline-none focus:border-[#0D1282]"
            />
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-900/5">
          <table className="w-full text-left">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                {["Hari", "Kategori Ibadah", "Waktu", "Tempat"].map((h) => (
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
              {loading ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-4 py-8 text-center text-slate-500 font-semibold animate-pulse"
                  >
                    Memuat jadwal ibadah...
                  </td>
                </tr>
              ) : jadwalFiltered.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-4 py-8 text-center text-red-500 font-semibold"
                  >
                    Tidak ada jadwal ibadah yang ditemukan.
                  </td>
                </tr>
              ) : (
                jadwalFiltered.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-slate-100 hover:bg-blue-50/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-slate-800 font-bold">
                      {item.day_of_week || item.hari}
                    </td>
                    <td className="px-6 py-4 text-[#0D1282] font-semibold">
                      {item.category || item.nama_ibadah || item.nama}
                    </td>
                    <td className="px-6 py-4 text-slate-700 font-medium">
                      {item.start_time || item.jam} WIB
                    </td>
                    <td className="px-6 py-4 text-slate-700">
                      {item.location || item.tempat}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* ══ KEGIATAN KHUSUS / EVENT GEREJA (Card) ═════════════════════════ */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12">
        <h2 className="mb-10 text-3xl font-extrabold text-[#0D1282]">
          Kegiatan Khusus / Event
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {loading ? (
            <p className="col-span-full text-center text-gray-500 animate-pulse font-semibold">
              Memuat kegiatan khusus...
            </p>
          ) : kegiatanKhusus.length === 0 ? (
            <p className="col-span-full text-center text-gray-400 py-10 border border-dashed border-gray-300 rounded-lg">
              Tidak ada event khusus dalam waktu dekat.
            </p>
          ) : (
            kegiatanKhusus.map((item) => (
              <div
                key={item.id}
                className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="h-52 w-full overflow-hidden bg-gray-200 relative">
                  <img
                    src={
                      item.gambar
                        ? `${eventStorageUrl}/${item.gambar}`
                        : "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800"
                    }
                    alt={item.judul || item.title || item.nama_kegiatan}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute left-4 top-4 rounded-full bg-[#D71313] px-3 py-1 text-xs font-bold text-white shadow-md">
                    EVENT KHUSUS
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="mb-4 line-clamp-2 text-2xl font-bold text-[#0D1282]">
                    {item.judul || item.title || item.nama_kegiatan}
                  </h3>
                  <p className="text-base mb-2 text-gray-700">
                    <strong className="font-bold text-[#D71313]">
                      Tanggal
                    </strong>
                    <span>
                      {" "}
                      :{" "}
                      {item.event_date
                        ? new Date(item.event_date).toLocaleDateString(
                            "id-ID",
                            { day: "2-digit", month: "long", year: "numeric" },
                          )
                        : "-"}
                    </span>
                  </p>
                  <p className="text-base mb-6 text-gray-600 italic flex-1 line-clamp-3">
                    "{item.description || item.deskripsi}"
                  </p>
                  <button
                    onClick={() => setSelectedEvent(item)}
                    className="w-fit rounded-full bg-[#0D1282] px-6 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#D71313]"
                  >
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
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-md transition hover:bg-[#D71313]"
            >
              <X size={18} />
            </button>
            <div className="h-[300px] w-full overflow-hidden bg-gray-100">
              <img
                src={
                  selectedEvent.gambar
                    ? `${eventStorageUrl}/${selectedEvent.gambar}`
                    : "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800"
                }
                alt="Event"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-10 pt-8">
              <span className="rounded-full bg-[#0D1282]/10 px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#0D1282]">
                Detail Event
              </span>
              <h2 className="mt-4 text-3xl font-extrabold text-[#0D1282]">
                {selectedEvent.judul ||
                  selectedEvent.title ||
                  selectedEvent.nama_kegiatan}
              </h2>
              <p className="mt-2 text-lg font-bold text-[#D71313]">
                📅{" "}
                {selectedEvent.event_date
                  ? new Date(selectedEvent.event_date).toLocaleDateString(
                      "id-ID",
                      {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      },
                    )
                  : "-"}
              </p>
              <div className="mt-8 border-t border-gray-200 pt-8">
                <p className="text-lg leading-[1.8] text-gray-700 whitespace-pre-wrap">
                  {selectedEvent.description || selectedEvent.deskripsi}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

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
