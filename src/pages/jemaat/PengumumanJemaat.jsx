import React, { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  pengumumanDataJemaat,
  pengumumanHeroData,
} from "../../data/PengumumanJemaatData";

const ITEMS_PER_PAGE = 3;

export default function PengumumanJemaat() {
  const [category, setCategory] = useState("Semua Kegiatan");
  const [searchInput, setSearchInput] = useState("");
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const categories = [
    "Semua Kegiatan",
    "Global",
    "Rayon",
    "Pelayanan",
    "Pemuda",
  ];

  const filteredData = useMemo(() => {
    return pengumumanDataJemaat.filter((item) => {
      const matchCategory =
        category === "Semua Kegiatan" ||
        item.category?.toLowerCase() === category.toLowerCase();

      const q = keyword.toLowerCase().trim();

      const matchSearch =
        q === "" ||
        item.title?.toLowerCase().includes(q) ||
        item.summary?.toLowerCase().includes(q) ||
        item.author?.toLowerCase().includes(q);

      return matchCategory && matchSearch;
    });
  }, [category, keyword]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredData.length / ITEMS_PER_PAGE),
  );

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  const handleSearch = (e) => {
    e.preventDefault();
    setKeyword(searchInput);
    setCurrentPage(1);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setCurrentPage(1);
  };

  const handlePage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      className="min-h-screen bg-white"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <div className="mx-auto w-full max-w-[1200px] px-4 py-8 md:px-6">
        <div className="text-center">
          <h1 className="text-[30px] font-extrabold md:text-[46px]">
            Pengumuman Gereja
          </h1>
          <p className="mt-2 text-[16px] md:text-[20px] text-gray-700">
            Informasi Resmi untuk Jemaat
          </p>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl bg-[#EEEDED] shadow-sm">
          <div className="relative flex min-h-[220px] items-center justify-center md:min-h-[260px]">
            {pengumumanHeroData?.image && (
              <img
                src={pengumumanHeroData.image}
                alt="Hero Pengumuman"
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-black/35" />
            <p className="relative z-10 px-4 text-center text-[20px] font-semibold text-white md:text-[26px]">
              {pengumumanHeroData?.title}
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSearch}
          className="mt-6 flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm md:flex-row md:items-center"
        >
          <select
            value={category}
            onChange={handleCategoryChange}
            className="h-[46px] w-full rounded-lg border border-gray-300 px-3 text-[14px] outline-none focus:border-[#0D1282] md:w-[220px]"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Cari kegiatan..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="h-[46px] w-full flex-1 rounded-lg border border-gray-300 px-3 text-[14px] outline-none focus:border-[#0D1282]"
          />

          <button
            type="submit"
            className="h-[46px] rounded-lg bg-[#0D1282] px-5 text-[14px] font-medium text-white transition hover:opacity-90 md:w-auto"
          >
            Cari
          </button>
        </form>

        <div className="mt-6 space-y-5">
          {paginatedData.length > 0 ? (
            paginatedData.map((item) => (
              <article
                key={item.id}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <h2 className="text-[20px] font-bold leading-snug text-black">
                  {item.title}
                </h2>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-[12px] font-semibold text-gray-700">
                      {item.category}
                    </span>
                    <span className="text-[13px] text-gray-500">
                      {item.publishedAt}
                    </span>
                  </div>

                  <span className="text-[13px] text-gray-600">
                    <b>Pembuat:</b> {item.author}
                  </span>
                </div>

                <p className="mt-4 text-[15px] leading-7 text-gray-700">
                  {item.summary}
                </p>

                <div className="mt-5">
                  <Link
                    to={`/pengumuman/${item.slug}`}
                    className="relative z-20 inline-flex min-h-[42px] items-center justify-center rounded-lg bg-[#0D1282] px-6 py-2 text-[14px] font-bold text-white transition-all hover:bg-[#0a0f63] hover:shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#0D1282] focus:ring-offset-2 cursor-pointer shadow-sm"
                  >
                    Baca selengkapnya
                  </Link>
                </div>
              </article>
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 py-10 text-center text-gray-500">
              Tidak ada data
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => handlePage(currentPage - 1)}
              disabled={currentPage === 1}
              className="rounded-lg border border-gray-300 px-4 py-2 text-[14px] transition-all hover:bg-gray-50 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
            >
              {"<<"}
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                type="button"
                key={i}
                onClick={() => handlePage(i + 1)}
                className={`rounded-lg px-4 py-2 text-[14px] transition-all active:scale-95 cursor-pointer ${
                  currentPage === i + 1
                    ? "bg-[#0D1282] text-white shadow-sm"
                    : "border border-gray-300 bg-white text-black"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              type="button"
              onClick={() => handlePage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="rounded-lg border border-gray-300 px-4 py-2 text-[14px] transition-all hover:bg-gray-50 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
            >
              {">>"}
            </button>
          </div>
        )}

        <div className="mt-10 border-t pt-5 text-center text-[14px] text-gray-600">
          © 2026 GPdI Jemaat Sibulele. All Rights Reserved.
        </div>
      </div>
    </section>
  );
}
