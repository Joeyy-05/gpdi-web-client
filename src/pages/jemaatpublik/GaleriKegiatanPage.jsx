import { useMemo, useState } from "react";
import { galeriData } from "../../data/galeriData";

const ITEMS_PER_PAGE = 6;

export default function GaleriKegiatanPage() {
  const { hero, items } = galeriData;
  const [kategori, setKategori] = useState("Semua Kegiatan");
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchKategori =
        kategori === "Semua Kegiatan" || item.kategori === kategori;

      const matchSearch = item.judul
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return matchKategori && matchSearch;
    });
  }, [kategori, searchQuery, items]);

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
      className="min-h-screen bg-white text-black"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <main className="pb-10">
        <div className="mx-auto w-full max-w-[1440px]">
          {/* Heading */}
          <section className="pt-[34px] text-center">
            <h1 className="text-[44px] font-extrabold tracking-[0.06em] text-black">
              Galeri Kegiatan
            </h1>

            <p className="mt-[20px] text-[18px] font-normal text-black">
              Dokumentasi Ibadah dan Aktivitas Jemaat
            </p>
          </section>

          {/* Hero Banner */}
          <section className="mt-[48px] px-[30px]">
            <div className="relative mx-auto flex h-[380px] w-full max-w-[1365px] items-center justify-center overflow-hidden bg-[#D9D9D9]">
              <img
                src={hero.gambarBanner}
                alt="Banner Galeri"
                className="absolute inset-0 h-full w-full object-cover opacity-50"
              />
              <div className="relative z-10 px-6 text-center">
                <p className="max-w-[900px] text-[22px] font-medium italic leading-relaxed text-black">
                  "{hero.ayat}"
                </p>
                <p className="mt-4 text-[18px] font-bold text-black">
                  — {hero.referensi}
                </p>
              </div>
            </div>
          </section>

          {/* Divider */}
          <section className="mt-[42px]">
            <div className="h-[1px] w-full bg-black/40" />
          </section>

          {/* Filter & Search */}
          <section className="mt-[78px]">
            <form
              onSubmit={handleSearch}
              className="mx-auto flex w-full max-w-[665px] items-center justify-center gap-[18px]"
            >
              <select
                value={kategori}
                onChange={handleKategoriChange}
                className="h-[70px] w-[200px] appearance-none border border-black bg-white px-[14px] pr-[40px] text-[18px] font-normal text-black outline-none"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' viewBox='0 0 24 24'%3E%3Cpath d='M6 9l6 6 6-6' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 14px center",
                  backgroundSize: "18px",
                }}
              >
                <option>Semua Kegiatan</option>
                <option>Ibadah</option>
                <option>Pemuda</option>
                <option>Sekolah Minggu</option>
                <option>Wanita</option>
              </select>

              <input
                type="text"
                placeholder="Cari Kegiatan..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="h-[70px] w-[310px] border border-black bg-white px-[16px] text-[18px] font-normal text-black outline-none placeholder:text-black"
              />

              <button
                type="submit"
                className="h-[70px] w-[100px] border border-black bg-white text-[18px] font-normal text-black"
              >
                Cari
              </button>
            </form>
          </section>

          {/* Gallery Grid */}
          <section className="mt-[56px] px-[30px]">
            <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {paginatedItems.length > 0 ? (
                paginatedItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer"
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden bg-gray-200">
                      <img
                        src={
                          item.gambar ||
                          "https://placehold.co/600x400/0D1282/FFFFFF?text=GPdI+Sibulele"
                        }
                        alt={item.judul}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="flex flex-col items-center p-6 text-center">
                      <h3 className="text-[18px] font-bold text-[#0D1282]">
                        {item.judul}
                      </h3>
                      <p className="mt-2 text-[14px] font-medium text-gray-500">
                        {item.tanggal}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-10 text-center text-[18px] text-black">
                  Tidak ada kegiatan yang cocok.
                </div>
              )}
            </div>
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

          {/* Modal Detail Kegiatan */}
          {selectedItem && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
              <div className="relative w-full max-w-[700px] overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/20 text-white transition hover:bg-black/50"
                >
                  ✕
                </button>

                <div className="aspect-video w-full overflow-hidden bg-gray-100">
                  <img
                    src={selectedItem.gambar}
                    alt={selectedItem.judul}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="p-8">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-[#0D1282]/10 px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#0D1282]">
                      {selectedItem.kategori}
                    </span>
                    <span className="text-sm font-medium text-gray-400">
                      {selectedItem.tanggal}
                    </span>
                  </div>

                  <h2 className="mt-4 text-3xl font-extrabold text-[#0D1282]">
                    {selectedItem.judul}
                  </h2>

                  <p className="mt-6 text-lg leading-relaxed text-gray-600">
                    {selectedItem.deskripsi}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
