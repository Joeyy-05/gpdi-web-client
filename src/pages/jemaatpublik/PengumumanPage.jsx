import { useMemo, useState } from "react";
import { pengumumanData } from "../../data/pengumumanData";

const ITEMS_PER_PAGE = 3;

export default function PengumumanPage() {
  const { items, hero } = pengumumanData;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return items.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [items, currentPage]);

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div
      className="min-h-screen bg-[#F8F9FA] text-black"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <main className="pb-20">
        <div className="mx-auto w-full max-w-[1440px]">
          {/* Heading */}
          <section className="pt-[60px] text-center px-6">
            <h1 className="text-[44px] font-extrabold tracking-[0.06em] text-[#0D1282]">
              Pengumuman
            </h1>
            <p className="mt-[20px] text-[18px] text-gray-600">
              Warta dan Informasi Terbaru Jemaat GPdI Sibulele
            </p>
          </section>

          {/* Banner */}
          <section className="mt-[48px] px-[30px]">
            <div className="relative mx-auto flex h-[380px] w-full max-w-[1365px] items-center justify-center overflow-hidden rounded-2xl bg-[#0D1282]">
              <img
                src={hero.gambarBanner}
                alt="Banner Pengumuman"
                className="absolute inset-0 h-full w-full object-cover opacity-40"
              />
              <div className="relative z-10 px-6 text-center text-white">
                <p className="max-w-[900px] text-[22px] font-medium italic leading-relaxed">
                  "{hero.isi}"
                </p>
                <p className="mt-4 text-[18px] font-bold">— {hero.referensi}</p>
              </div>
            </div>
          </section>

          {/* List Pengumuman */}
          <section className="mt-[80px] space-y-8 px-[30px]">
            {paginatedItems.map((item) => (
              <div
                key={item.id}
                className="group mx-auto w-full max-w-[1100px] rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-md"
              >
                {/* Header */}
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                  <div className="flex items-center gap-4">
                    <span className="rounded-full bg-[#D71313]/10 px-4 py-1 text-[13px] font-bold uppercase text-[#D71313]">
                      {item.kategori || "Warta Jemaat"}
                    </span>
                    <h2 className="text-[24px] font-bold text-[#0D1282] transition-colors group-hover:text-[#D71313]">
                      {item.judul}
                    </h2>
                  </div>
                  <p className="text-[15px] font-medium text-gray-400">
                    {item.tanggal}
                  </p>
                </div>
                {/* Deskripsi */}
                <p className="mt-6 text-[17px] font-normal leading-[1.8] text-gray-700">
                  {item.isi}
                </p>
              </div>
            ))}
          </section>

          {/* Pagination */}
          <section className="mt-[60px]">
            <div className="mx-auto flex w-full max-w-[700px] items-center justify-center gap-3">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="flex h-12 w-12 items-center justify-center rounded-lg bg-white border border-gray-200 text-[#0D1282] shadow-sm transition hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {"<<"}
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
                {">>"}
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
