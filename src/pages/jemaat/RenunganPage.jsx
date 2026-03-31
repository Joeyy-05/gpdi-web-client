import React, { useState, useMemo, useEffect } from "react";
// Hapus impor Link karena kita tidak berpindah halaman lagi
import { getRenunganJemaat } from "../../services/contentService";

const ITEMS_PER_PAGE = 4;

const RenunganPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [renunganData, setRenunganData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // PERBAIKAN 1: State untuk melacak ID renungan mana yang sedang dibuka (expanded)
  const [expandedId, setExpandedId] = useState(null);

  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  useEffect(() => {
    const fetchRenungan = async () => {
      setLoading(true);
      try {
        const res = await getRenunganJemaat();
        const sortedData = (res.data || []).sort(
          (a, b) => new Date(b.published_at || b.created_at) - new Date(a.published_at || a.created_at)
        );
        setRenunganData(sortedData);
      } catch (error) {
        console.error("Gagal memuat renungan:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRenungan();
  }, []);

  const featuredRenungan = renunganData.length > 0 ? renunganData[0] : null;
  const archiveList = renunganData.slice(1);
  const totalPages = Math.max(1, Math.ceil(archiveList.length / ITEMS_PER_PAGE));

  const paginatedRenungan = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return archiveList.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [currentPage, archiveList]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setExpandedId(null); // Tutup semua renungan yang terbuka saat pindah halaman
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // PERBAIKAN 2: Fungsi untuk membuka/menutup isi renungan
  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div
      className="min-h-screen bg-gray-50 py-10"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <main className="mx-auto max-w-[1200px] px-6">
        <section className="mb-12 text-center">
          <h1 className="text-[36px] font-extrabold text-[#0D1282] md:text-[48px]">
            Renungan Harian
          </h1>
          <p className="mt-2 text-[18px] font-medium italic text-gray-600">
            “Firman Tuhan untuk Pertumbuhan Rohani”
          </p>
          <p className="mt-4 text-[16px] font-bold text-[#D71313]">{today}</p>
        </section>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-lg font-bold text-[#0D1282] animate-pulse">Memuat renungan hari ini...</p>
          </div>
        ) : renunganData.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-200">
            <p className="text-gray-500 font-medium text-lg">Belum ada renungan yang diterbitkan saat ini.</p>
          </div>
        ) : (
          <>
            {/* Featured Card */}
            {featuredRenungan && (
              <section className="mb-16 overflow-hidden rounded-2xl bg-white shadow-md border-t-4 border-[#0D1282]">
                <div className="p-8 md:p-12">
                  <h2 className="text-[28px] font-bold text-[#0D1282] md:text-[32px]">
                    {featuredRenungan.tema}
                  </h2>
                  <p className="mt-3 text-[18px] font-bold text-[#D71313]">
                    📖 {featuredRenungan.ayat_pokok}
                  </p>

                  <div className="mt-8 space-y-4 text-[16px] leading-[1.8] text-gray-700 md:text-[18px] break-words">
                    {featuredRenungan.isi.split('\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>

                  <div className="mt-10 flex flex-col justify-between border-t border-gray-100 pt-8 md:flex-row md:items-center">
                    <p className="text-[14px] font-medium text-gray-500">
                      Oleh:{" "}
                      <span className="font-bold text-gray-800">
                        Pengurus GPdI Sibulele
                      </span>{" "}
                      — {formatDate(featuredRenungan.published_at || featuredRenungan.created_at)}
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* Archive List */}
            {archiveList.length > 0 && (
              <>
                <div className="mb-6 border-b border-gray-200 pb-2">
                  <h3 className="text-xl font-bold text-[#0D1282]">Arsip Renungan</h3>
                </div>
                <section className="grid gap-8 md:grid-cols-2">
                  {paginatedRenungan.map((item) => {
                    const isExpanded = expandedId === item.id;

                    return (
                      <article
                        // PERBAIKAN 3: Menambahkan h-auto agar card bisa menyesuaikan tinggi isi, dan break-words agar tidak keluar garis
                        className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-blue-100 h-auto"
                        key={item.id}
                      >
                        <div className="pr-2">
                          <span className="text-[12px] font-bold text-[#D71313] uppercase">
                            {formatDate(item.published_at || item.created_at)}
                          </span>
                          <h3 className="mt-2 text-[20px] font-bold text-[#0D1282] leading-snug break-words">
                            {item.tema}
                          </h3>
                          
                          {/* PERBAIKAN 4: Logika buka tutup isi teks */}
                          {isExpanded ? (
                            <div className="mt-3 text-[15px] leading-relaxed text-gray-600 whitespace-pre-wrap break-words">
                              {item.isi.split('\n').map((paragraph, index) => (
                                <p key={index} className="mb-2">{paragraph}</p>
                              ))}
                            </div>
                          ) : (
                            <p className="mt-3 text-[15px] leading-relaxed text-gray-600 line-clamp-3 whitespace-pre-wrap break-words">
                              {item.isi}
                            </p>
                          )}
                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-50 flex justify-between items-center">
                          {/* PERBAIKAN 5: Mengubah Link menjadi Button */}
                          <button
                            onClick={() => toggleExpand(item.id)}
                            className="inline-flex items-center gap-1 text-[14px] font-bold text-[#0D1282] hover:text-[#D71313] transition cursor-pointer"
                          >
                            {isExpanded ? "Tutup Tulisan ↑" : "Baca Selengkapnya →"}
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </section>
              </>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <section className="mt-16 flex justify-center gap-2">
                <button
                  onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                  disabled={currentPage === 1}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white text-[14px] transition hover:bg-gray-50 active:scale-90 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-[#0D1282] font-bold"
                >
                  {"<<"}
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                  <button
                    key={num}
                    onClick={() => handlePageChange(num)}
                    className={`flex h-10 w-10 items-center justify-center rounded-lg text-[14px] font-bold transition active:scale-90 cursor-pointer ${
                      num === currentPage
                        ? "bg-[#0D1282] text-white shadow-md border-transparent"
                        : "border border-gray-300 bg-white text-[#0D1282] hover:bg-gray-50"
                    }`}
                  >
                    {num}
                  </button>
                ))}
                <button
                  onClick={() =>
                    handlePageChange(Math.min(currentPage + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white text-[14px] transition hover:bg-gray-50 active:scale-90 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-[#0D1282] font-bold"
                >
                  {">>"}
                </button>
              </section>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default RenunganPage;