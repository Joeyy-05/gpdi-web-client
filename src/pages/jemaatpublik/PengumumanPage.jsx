import React, { useMemo, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Megaphone } from "lucide-react";
import { pengumumanData } from "../../data/pengumumanData";
import { getAllPengumuman } from "../../services/contentService";

const ITEMS_PER_PAGE = 3;

export default function PengumumanPage() {
  // Mengambil data banner statis dari desain PM
  const { hero } = pengumumanData;

  // State Dinamis
  const [pengumumanList, setPengumumanList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPengumuman = async () => {
      setLoading(true);
      try {
        const res = await getAllPengumuman();

        // Memastikan hanya pengumuman berstatus "Aktif" yang muncul di halaman publik
        const activePengumuman = (res.data || []).filter(
          (item) => item.status === "Aktif",
        );
        setPengumumanList(activePengumuman);
      } catch (error) {
        console.error("Gagal memuat pengumuman:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPengumuman();
  }, []);

  const totalPages = Math.max(
    1,
    Math.ceil(pengumumanList.length / ITEMS_PER_PAGE),
  );

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return pengumumanList.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [pengumumanList, currentPage]);

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Fungsi pembantu format tanggal ke bahasa Indonesia
  const formatTanggal = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Fungsi pembantu untuk Label/Badge Kategori berdasarkan Scope
  const getBadgeLabel = (scope) => {
    if (scope === "publik") return "Pengumuman Publik";
    if (scope === "jemaat") return "Internal Jemaat";
    if (scope === "rayon") return "Khusus Rayon";
    return "Warta Jemaat";
  };

  return (
    <div
      className="min-h-screen bg-[#f7f8fb] text-slate-900"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <main className="pb-20">
        <div className="mx-auto w-full max-w-[1440px]">
          {/* Heading */}
          <section className="px-5 pb-4 pt-16 text-center sm:px-8 lg:px-12">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D71313]">
              Tetap terinformasi
            </p>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[#0D1282] sm:text-6xl">
              Pengumuman
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Warta dan Informasi Terbaru Jemaat GPdI Sibulele
            </p>
          </section>

          {/* Banner */}
          <section className="mt-12 px-5 sm:px-8 lg:px-12">
            <div className="relative mx-auto flex h-[330px] w-full items-center justify-center overflow-hidden rounded-2xl bg-[#0D1282] shadow-xl sm:h-[410px]">
              <img
                src={hero.gambarBanner}
                alt="Banner Pengumuman"
                className="absolute inset-0 h-full w-full object-cover opacity-40"
              />
              <div className="relative z-10 px-6 text-center text-white">
                <Megaphone className="mb-6 text-red-200" size={30} />
                <p className="max-w-3xl px-5 text-xl font-medium italic leading-relaxed sm:text-3xl">
                  "{hero.isi}"
                </p>
                <p className="mt-4 text-[18px] font-bold">— {hero.referensi}</p>
              </div>
            </div>
          </section>

          {/* List Pengumuman */}
          <section className="mt-16 space-y-5 px-5 sm:px-8 lg:px-12">
            {loading ? (
              <div className="py-10 text-center text-lg font-semibold text-gray-500 animate-pulse">
                Memuat pengumuman terbaru...
              </div>
            ) : pengumumanList.length === 0 ? (
              <div className="py-16 text-center text-[18px] font-medium text-gray-500 border-2 border-dashed border-gray-200 rounded-2xl max-w-[1100px] mx-auto">
                Belum ada pengumuman terbaru saat ini.
              </div>
            ) : (
              paginatedItems.map((item) => (
                <div
                  key={item.id}
                  className="group mx-auto w-full max-w-5xl rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-xl sm:p-8"
                >
                  {/* Header Card */}
                  <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div className="flex items-center gap-4">
                      <span className="rounded-full bg-[#D71313]/10 px-4 py-1 text-[13px] font-bold uppercase text-[#D71313]">
                        {getBadgeLabel(item.scope)}
                      </span>
                      <h2 className="text-xl font-bold text-[#0D1282] transition-colors group-hover:text-[#D71313] sm:text-2xl">
                        {item.judul}
                      </h2>
                    </div>
                    <p className="text-[15px] font-medium text-gray-400">
                      {formatTanggal(item.created_at)}
                    </p>
                  </div>
                  {/* Deskripsi */}
                  <p className="mt-6 text-[17px] font-normal leading-[1.8] text-gray-700 whitespace-pre-wrap">
                    {item.isi}
                  </p>
                </div>
              ))
            )}
          </section>

          {/* Pagination */}
          {!loading && pengumumanList.length > 0 && (
            <section className="mt-[60px]">
              <div className="mx-auto flex w-full max-w-[700px] items-center justify-center gap-3">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="flex h-12 w-12 items-center justify-center rounded-lg bg-white border border-gray-200 text-[#0D1282] shadow-sm transition hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={18} />
                </button>

                {pageNumbers.map((num) => (
                  <button
                    key={num}
                    onClick={() => setCurrentPage(num)}
                    className={`h-12 w-12 rounded-lg border text-lg font-bold transition ${
                      num === currentPage
                        ? "bg-[#0D1282] border-[#0D1282] text-white"
                        : "bg-white border-gray-200 text-[#0D1282] hover:bg-gray-50"
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
                  className="flex h-12 w-12 items-center justify-center rounded-lg bg-white border border-gray-200 text-[#0D1282] shadow-sm transition hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
