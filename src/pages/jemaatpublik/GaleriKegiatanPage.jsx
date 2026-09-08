import React, { useState, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight, Image, Search, X } from "lucide-react";
import { getPublicGaleri } from "../../services/contentService";
import { galeriData } from "../../data/galeriData";
import { contentStorageUrl } from "../../config/mediaUrls";

const ITEMS_PER_PAGE = 6;

export default function GaleriKegiatanPage() {
  const { hero } = galeriData;
  const [kategori, setKategori] = useState("Semua Kegiatan");
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);

  // State Dinamis dari Backend
  const [kegiatanData, setKegiatanData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGaleri = async () => {
      setLoading(true);
      try {
        // Menarik data dari API Galeri (Port 8002)
        const res = await getPublicGaleri();
        setKegiatanData(res.data || []);
      } catch (error) {
        console.error("Gagal memuat galeri kegiatan:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGaleri();
  }, []);

  // Format data backend ke format UI
  const formattedItems = useMemo(() => {
    return kegiatanData.map((item) => ({
      id: item.id,
      judul: item.judul,
      tanggal: item.tanggal_kegiatan
        ? new Date(item.tanggal_kegiatan).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })
        : "-",
      gambar: item.path_foto
        ? `${contentStorageUrl}/${item.path_foto}`
        : "https://placehold.co/600x400/0D1282/FFFFFF?text=GPdI+Sibulele",
      kategori: item.kategori || "Umum",
      deskripsi: item.deskripsi || "Tidak ada deskripsi.",
    }));
  }, [kegiatanData]);

  // Logika Filter Pencarian & Kategori
  const filteredItems = useMemo(() => {
    return formattedItems.filter((item) => {
      const matchKategori =
        kategori === "Semua Kegiatan" || item.kategori === kategori;
      const matchSearch = item.judul
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return matchKategori && matchSearch;
    });
  }, [kategori, searchQuery, formattedItems]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredItems.length / ITEMS_PER_PAGE),
  );

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredItems, currentPage]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    setCurrentPage(1);
  };

  const handleKategoriChange = (e) => {
    setKategori(e.target.value);
    setCurrentPage(1);
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div
      className="min-h-screen bg-[#f7f8fb] text-slate-900"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <main className="pb-10">
        <div className="mx-auto w-full max-w-[1440px]">
          {/* Heading */}
          <section className="px-5 pb-4 pt-16 text-center sm:px-8 lg:px-12">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D71313]">
              Momen yang dibagikan
            </p>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[#0D1282] sm:text-6xl">
              Galeri Kegiatan
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Dokumentasi Ibadah dan Aktivitas Jemaat
            </p>
          </section>

          {/* Hero Banner (Data Statis dari galeriData) */}
          <section className="mt-12 px-5 sm:px-8 lg:px-12">
            <div className="relative mx-auto flex h-[330px] w-full items-center justify-center overflow-hidden rounded-2xl bg-[#0D1282] shadow-xl sm:h-[410px]">
              <img
                src={hero.gambarBanner}
                alt="Banner Galeri"
                className="absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-overlay"
              />
              <div className="relative z-10 px-6 text-center text-white">
                <p className="max-w-3xl px-5 text-xl font-medium italic leading-relaxed drop-shadow-md sm:text-3xl">
                  "{hero.ayat}"
                </p>
                <p className="mt-6 text-[20px] font-bold drop-shadow-md">
                  — {hero.referensi}
                </p>
              </div>
            </div>
          </section>

          {/* Divider */}
          {/* Filter & Search */}
          <section className="mt-16 px-5 sm:px-8 lg:px-12">
            <form
              onSubmit={handleSearch}
              className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-lg shadow-slate-900/5 md:flex-row"
            >
              <div className="relative w-full md:w-auto">
                <select
                  value={kategori}
                  onChange={handleKategoriChange}
                  className="h-[60px] w-full md:w-[220px] appearance-none rounded-xl border border-gray-300 bg-white px-5 pr-[40px] text-[16px] font-medium text-gray-700 outline-none focus:border-[#0D1282] focus:ring-1 focus:ring-[#0D1282] shadow-sm transition-all cursor-pointer"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' viewBox='0 0 24 24'%3E%3Cpath d='M6 9l6 6 6-6' stroke='%234B5563' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 16px center",
                    backgroundSize: "16px",
                  }}
                >
                  <option value="Semua Kegiatan">Semua Kegiatan</option>
                  <option value="Ibadah">Ibadah Raya</option>
                  <option value="Pemuda">Pemuda & Remaja</option>
                  <option value="Sekolah Minggu">Sekolah Minggu</option>
                  <option value="Wanita">Wanita / Kaum Ibu</option>
                  <option value="Umum">Umum / Lainnya</option>
                </select>
              </div>

              <input
                type="text"
                placeholder="Cari nama kegiatan..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="h-12 w-full flex-1 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-gray-700 outline-none placeholder:text-gray-400 focus:border-[#0D1282] focus:ring-1 focus:ring-[#0D1282] transition-all"
              />

              <button
                type="submit"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0D1282] text-sm font-bold text-white shadow-md transition-all hover:bg-[#0a0e66] md:w-28"
              >
                <Search size={16} /> Cari
              </button>
            </form>
          </section>

          {/* Gallery Grid */}
          <section className="mt-14 px-5 sm:px-8 lg:px-12">
            <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
              {loading ? (
                <div className="col-span-full py-20 text-center text-lg font-semibold text-gray-500 animate-pulse">
                  Memuat dokumentasi kegiatan...
                </div>
              ) : paginatedItems.length > 0 ? (
                paginatedItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden bg-gray-200 relative">
                      <img
                        src={item.gambar}
                        alt={item.judul}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
                      <div className="absolute top-3 left-3 bg-black/60 text-white text-[10px] px-3 py-1.5 rounded-lg font-bold uppercase tracking-wider backdrop-blur-sm">
                        {item.kategori}
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col justify-center p-6">
                      <h3 className="text-[20px] font-bold text-[#0D1282] line-clamp-2">
                        {item.judul}
                      </h3>
                      <p className="mt-3 text-[14px] font-semibold text-[#D71313] bg-red-50 px-3 py-1 rounded-full">
                        {item.tanggal}
                      </p>
                    </div>
                  </button>
                ))
              ) : (
                <div className="col-span-full py-16 text-center text-[18px] font-medium text-gray-500 border-2 border-dashed border-gray-200 rounded-2xl">
                  Tidak ada dokumentasi kegiatan yang sesuai pencarian.
                </div>
              )}
            </div>
          </section>

          {/* Pagination */}
          {!loading && filteredItems.length > 0 && (
            <section className="mt-[80px]">
              <div className="mx-auto flex w-full max-w-[700px] items-center justify-center gap-3">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-white border border-gray-300 text-[#0D1282] shadow-sm transition hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={18} />
                </button>

                {pageNumbers.map((num) => (
                  <button
                    key={num}
                    onClick={() => setCurrentPage(num)}
                    className={`h-12 w-12 rounded-xl text-lg font-bold transition-all shadow-sm ${
                      num === currentPage
                        ? "bg-[#0D1282] border-transparent text-white"
                        : "bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 hover:text-[#0D1282]"
                    }`}
                  >
                    {num}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-white border border-gray-300 text-[#0D1282] shadow-sm transition hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </section>
          )}

          {/* Modal Detail Kegiatan */}
          {selectedItem && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fade-in">
              <div className="relative w-full max-w-[800px] overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute right-6 top-6 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition hover:bg-[#D71313]"
                >
                  <X size={18} />
                </button>

                <div className="aspect-video w-full overflow-hidden bg-gray-100">
                  <img
                    src={selectedItem.gambar}
                    alt={selectedItem.judul}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="p-8 md:p-10">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-blue-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0D1282]">
                      {selectedItem.kategori}
                    </span>
                    <span className="text-sm font-bold text-[#D71313]">
                      📅 {selectedItem.tanggal}
                    </span>
                  </div>

                  <h2 className="mt-5 text-2xl md:text-3xl font-extrabold text-[#0D1282] leading-tight">
                    {selectedItem.judul}
                  </h2>

                  <div className="mt-6 border-t border-gray-100 pt-6">
                    <p className="text-lg leading-relaxed text-gray-600 whitespace-pre-wrap">
                      {selectedItem.deskripsi}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
