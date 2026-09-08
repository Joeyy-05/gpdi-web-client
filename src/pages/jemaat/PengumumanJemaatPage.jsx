import React, { useMemo, useState, useEffect } from "react";
import { Bell, ChevronLeft, ChevronRight, Search } from "lucide-react";
// Link dihapus karena kita tidak lagi pindah halaman
import { getAllPengumuman } from "../../services/contentService";

const ITEMS_PER_PAGE = 3;

export default function PengumumanJemaatPage() {
  const [category, setCategory] = useState("Semua Pengumuman");
  const [searchInput, setSearchInput] = useState("");
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // State Dinamis
  const [pengumumanData, setPengumumanData] = useState([]);
  const [loading, setLoading] = useState(true);

  // PERBAIKAN: State untuk melacak ID pengumuman yang sedang dibuka
  const [expandedId, setExpandedId] = useState(null);

  const categories = ["Semua Pengumuman", "Publik", "Internal Jemaat", "Rayon"];

  const pengumumanHeroData = {
    title:
      "Memperhatikan setiap informasi adalah bentuk partisipasi aktif kita dalam persekutuan.",
    image:
      "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073&auto=format&fit=crop",
  };

  useEffect(() => {
    const fetchPengumuman = async () => {
      setLoading(true);
      try {
        const res = await getAllPengumuman();

        const activeData = (res.data || []).filter(
          (item) => item.status === "Aktif",
        );

        const formattedData = activeData.map((item) => {
          let catLabel = "Umum";
          if (item.scope === "publik") catLabel = "Publik";
          if (item.scope === "jemaat") catLabel = "Internal Jemaat";
          if (item.scope === "rayon") catLabel = "Rayon";

          return {
            id: item.id,
            title: item.judul,
            category: catLabel,
            publishedAt: new Date(item.created_at).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }),
            author: "Pengurus Gereja",
            summary: item.isi,
          };
        });

        setPengumumanData(formattedData.reverse());
      } catch (error) {
        console.error("Gagal memuat pengumuman jemaat:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPengumuman();
  }, []);

  const filteredData = useMemo(() => {
    return pengumumanData.filter((item) => {
      const matchCategory =
        category === "Semua Pengumuman" ||
        item.category?.toLowerCase() === category.toLowerCase();

      const q = keyword.toLowerCase().trim();

      const matchSearch =
        q === "" ||
        item.title?.toLowerCase().includes(q) ||
        item.summary?.toLowerCase().includes(q);

      return matchCategory && matchSearch;
    });
  }, [category, keyword, pengumumanData]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredData.length / ITEMS_PER_PAGE),
  );

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  const handleSearch = (e) => {
    e.preventDefault();
    setKeyword(searchInput);
    setCurrentPage(1);
    setExpandedId(null); // Tutup pengumuman saat mencari ulang
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setCurrentPage(1);
    setExpandedId(null); // Tutup pengumuman saat ganti kategori
  };

  const handlePage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    setExpandedId(null); // Tutup pengumuman saat ganti halaman
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // PERBAIKAN: Fungsi untuk memunculkan/menyembunyikan teks penuh
  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section
      className="min-h-screen bg-[#f7f8fb]"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <div className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-8 lg:px-12">
        <div className="text-center sm:text-left">
          <p className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#D71313] sm:justify-start">
            <Bell size={15} /> Informasi jemaat
          </p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[#0D1282] sm:text-6xl">
            Pengumuman Gereja
          </h1>
          <p className="mt-4 max-w-2xl text-base font-medium leading-7 text-slate-600 sm:text-lg">
            Informasi Resmi untuk Jemaat
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl bg-[#EEEDED] shadow-xl">
          <div className="relative flex min-h-[220px] items-center justify-center md:min-h-[260px] bg-[#0D1282]">
            <img
              src={pengumumanHeroData.image}
              alt="Hero Pengumuman"
              className="absolute inset-0 h-full w-full object-cover mix-blend-overlay opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <p className="relative z-10 px-6 text-center text-[20px] font-semibold text-white md:text-[26px] italic max-w-3xl drop-shadow-md">
              "{pengumumanHeroData.title}"
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSearch}
          className="mt-8 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-lg shadow-slate-900/5 md:flex-row md:items-center"
        >
          <select
            value={category}
            onChange={handleCategoryChange}
            className="h-12 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-[#0D1282] focus:ring-1 focus:ring-[#0D1282] md:w-[220px] cursor-pointer bg-white"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Cari kata kunci pengumuman..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="h-12 w-full flex-1 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-[#0D1282] focus:ring-1 focus:ring-[#0D1282]"
          />

          <button
            type="submit"
            className="flex h-12 items-center justify-center gap-2 rounded-xl bg-[#0D1282] px-6 text-sm font-bold tracking-wide text-white transition hover:bg-[#0a0e66] shadow-sm md:w-auto"
          >
            <Search size={16} /> Cari
          </button>
        </form>

        <div className="mt-8 space-y-5">
          {loading ? (
            <div className="rounded-2xl border border-gray-200 py-16 text-center text-lg font-semibold text-gray-500 animate-pulse bg-gray-50">
              Menarik data pengumuman...
            </div>
          ) : paginatedData.length > 0 ? (
            paginatedData.map((item) => {
              const isExpanded = expandedId === item.id;

              return (
                <article
                  key={item.id}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-blue-100 hover:shadow-xl md:p-8"
                >
                  <h2 className="text-[22px] font-bold leading-snug text-[#0D1282]">
                    {item.title}
                  </h2>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full bg-red-50 px-3 py-1 text-[12px] font-bold uppercase tracking-wider text-[#D71313]">
                        {item.category}
                      </span>
                      <span className="text-[13px] font-medium text-gray-500 flex items-center gap-1">
                        {item.publishedAt}
                      </span>
                    </div>

                    <span className="text-[13px] font-medium text-gray-600 bg-gray-50 px-3 py-1 rounded-md">
                      <b>Oleh:</b> {item.author}
                    </span>
                  </div>

                  {/* PERBAIKAN: Logika line-clamp dinamis berdasarkan state isExpanded */}
                  <p
                    className={`mt-5 text-[16px] leading-relaxed text-gray-700 whitespace-pre-wrap transition-all duration-300 ${isExpanded ? "" : "line-clamp-3"}`}
                  >
                    {item.summary}
                  </p>

                  <div className="mt-6 pt-2">
                    {/* PERBAIKAN: Mengganti <Link> dengan <button> */}
                    <button
                      onClick={() => toggleExpand(item.id)}
                      className="inline-flex min-h-[42px] items-center justify-center rounded-lg bg-[#0D1282] px-6 py-2 text-[14px] font-bold text-white transition-all hover:bg-[#0a0f63] hover:shadow-lg shadow-sm"
                    >
                      {isExpanded ? "Tutup Pengumuman" : "Baca Selengkapnya"}
                    </button>
                  </div>
                </article>
              );
            })
          ) : (
            <div className="rounded-2xl border-2 border-dashed border-gray-300 py-16 text-center text-[18px] font-medium text-gray-500 bg-gray-50">
              Tidak ada pengumuman yang sesuai pencarian.
            </div>
          )}
        </div>

        {/* Paginasi */}
        {!loading && totalPages > 1 && (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => handlePage(currentPage - 1)}
              disabled={currentPage === 1}
              className="rounded-lg border border-gray-300 px-4 py-2 text-[14px] font-bold text-[#0D1282] transition-all hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30"
            >
              {"<<"}
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                type="button"
                key={i}
                onClick={() => handlePage(i + 1)}
                className={`h-[42px] w-[42px] rounded-lg text-[15px] font-bold transition-all ${
                  currentPage === i + 1
                    ? "bg-[#0D1282] text-white shadow-md border-transparent"
                    : "border border-gray-300 bg-white text-[#0D1282] hover:bg-gray-50"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              type="button"
              onClick={() => handlePage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="rounded-lg border border-gray-300 px-4 py-2 text-[14px] font-bold text-[#0D1282] transition-all hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30"
            >
              {">>"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
