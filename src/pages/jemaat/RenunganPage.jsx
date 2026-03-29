import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { featuredRenungan, renunganList } from "../../data/renunganData";

const ITEMS_PER_PAGE = 4;

const RenunganPage = () => {
  // Menambahkan data dummy tambahan untuk keperluan demonstrasi paginasi
  const extendedRenunganList = useMemo(
    () => [
      ...renunganList,
      {
        id: 101,
        date: "12 Maret 2024",
        title: "Kekuatan dalam Kelemahan",
        summary:
          "Tuhan seringkali menyatakan kuasa-Nya yang sempurna justru di saat kita merasa tidak berdaya. Jangan menyerah pada keadaan.",
      },
      {
        id: 102,
        date: "11 Maret 2024",
        title: "Kasih yang Memulihkan",
        summary:
          "Tiada luka yang terlalu dalam bagi kasih Tuhan. Ia adalah tabib yang ajaib yang mampu memulihkan hati yang hancur.",
      },
      {
        id: 103,
        date: "10 Maret 2024",
        title: "Berjalan di Atas Air",
        summary:
          "Jangan fokus pada badai di sekelilingmu, tetapi tetaplah memandang kepada Yesus yang memanggilmu untuk melangkah.",
      },
      {
        id: 104,
        date: "09 Maret 2024",
        title: "Buah Roh: Kesabaran",
        summary:
          "Menunggu waktu Tuhan memang tidak mudah, namun hasil dari kesabaran adalah kedamaian yang melampaui segala akal.",
      },
    ],
    [],
  );

  const [currentPage, setCurrentPage] = useState(1);

  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const totalPages = Math.ceil(extendedRenunganList.length / ITEMS_PER_PAGE);

  const paginatedRenungan = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return extendedRenunganList.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [currentPage, extendedRenunganList]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className="min-h-screen bg-gray-50 py-10"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <main className="mx-auto max-w-[1200px] px-6">
        {/* Hero Header */}
        <section className="mb-12 text-center">
          <h1 className="text-[36px] font-extrabold text-[#0D1282] md:text-[48px]">
            Renungan Harian
          </h1>
          <p className="mt-2 text-[18px] font-medium italic text-gray-600">
            “Firman Tuhan untuk Pertumbuhan Rohani”
          </p>
          <p className="mt-4 text-[16px] font-bold text-[#D71313]">{today}</p>
        </section>

        {/* Featured Card */}
        <section className="mb-16 overflow-hidden rounded-2xl bg-white shadow-md border-t-4 border-[#0D1282]">
          <div className="p-8 md:p-12">
            <h2 className="text-[28px] font-bold text-[#0D1282] md:text-[32px]">
              {featuredRenungan.title}
            </h2>
            <p className="mt-3 text-[18px] font-bold text-[#D71313]">
              {featuredRenungan.verse}
            </p>

            <div className="mt-8 space-y-4 text-[16px] leading-[1.8] text-gray-700 md:text-[18px]">
              {featuredRenungan.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-10 flex flex-col justify-between border-t border-gray-100 pt-8 md:flex-row md:items-center">
              <p className="text-[14px] font-medium text-gray-500">
                Oleh:{" "}
                <span className="font-bold text-gray-800">
                  {featuredRenungan.author}
                </span>{" "}
                — {featuredRenungan.publishDate}
              </p>

              <div className="mt-6 flex gap-4 md:mt-0">
                <button className="flex h-[42px] items-center gap-2 rounded-lg bg-gray-100 px-5 text-[14px] font-bold text-gray-700 transition hover:bg-gray-200 active:scale-95 cursor-pointer">
                  Simpan 🔖
                </button>
                <button className="flex h-[42px] items-center gap-2 rounded-lg bg-[#0D1282] px-5 text-[14px] font-bold text-white transition hover:bg-[#0a0e66] active:scale-95 cursor-pointer">
                  Bagikan ↗
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Archive List */}
        <section className="grid gap-8 md:grid-cols-2">
          {paginatedRenungan.map((item) => (
            <article
              className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              key={item.id}
            >
              <div>
                <span className="text-[12px] font-bold text-[#D71313] uppercase">
                  {item.date}
                </span>
                <h3 className="mt-2 text-[20px] font-bold text-[#0D1282]">
                  {item.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-gray-600 line-clamp-3">
                  {item.summary}
                </p>
              </div>

              <div className="mt-6">
                <Link
                  to={`/renungan/${item.id}`}
                  className="inline-flex items-center gap-1 text-[14px] font-bold text-[#0D1282] hover:text-[#D71313] transition cursor-pointer"
                >
                  Baca Selengkapnya →
                </Link>
              </div>
            </article>
          ))}
        </section>

        {/* Pagination */}
        {totalPages > 1 && (
          <section className="mt-16 flex justify-center gap-2">
            <button
              onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white text-[14px] transition hover:bg-gray-50 active:scale-90 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {"<<"}
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => handlePageChange(num)}
                className={`flex h-10 w-10 items-center justify-center rounded-lg text-[14px] font-bold transition active:scale-90 cursor-pointer ${
                  num === currentPage
                    ? "bg-[#0D1282] text-white shadow-md"
                    : "border border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
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
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-300 bg-white text-[14px] transition hover:bg-gray-50 active:scale-90 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {">>"}
            </button>
          </section>
        )}
      </main>
    </div>
  );
};

export default RenunganPage;
