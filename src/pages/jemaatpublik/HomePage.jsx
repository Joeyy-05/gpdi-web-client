import React, { useState, useEffect } from "react";
import { homeData } from "../../data/homeData";
// Import Services untuk menarik data dinamis
import { getPublicWorship } from "../../services/eventService";
import { getAllPengumuman, getRenunganJemaat } from "../../services/contentService";

export default function HomePage() {
  // Hanya mengambil data statis yang diperlukan (Gereja & Banner Hero)
  const { gereja, hero } = homeData;

  const [activeDetail, setActiveDetail] = useState(null);
  
  // State Dinamis dari Backend
  const [jadwalList, setJadwalList] = useState([]);
  const [pengumumanList, setPengumumanList] = useState([]);
  const [renunganHariIni, setRenunganHariIni] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      setLoading(true);
      try {
        // Melakukan Fetching secara paralel agar halaman dimuat lebih cepat
        const [resWorship, resPengumuman, resRenungan] = await Promise.all([
          getPublicWorship().catch(() => ({ data: [] })),
          getAllPengumuman().catch(() => ({ data: [] })),
          getRenunganJemaat().catch(() => ({ data: [] }))
        ]);

        // 1. Set Data Jadwal
        setJadwalList(resWorship.data || []);

        // 2. Set Data Pengumuman (Filter hanya yang Aktif)
        const activePengumuman = (resPengumuman.data || []).filter(item => item.status === 'Aktif');
        setPengumumanList(activePengumuman);

        // 3. Set Data Renungan (Ambil yang terbaru/pertama dari list)
        const renunganData = resRenungan.data || [];
        if (renunganData.length > 0) {
          setRenunganHariIni(renunganData[0]);
        }
      } catch (error) {
        console.error("Gagal memuat data beranda:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeData();
  }, []);

  // Fungsi Format Tanggal
  const formatTanggal = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <div
      className="min-h-screen bg-[#FFFFFF] text-[#0D1282]"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <main className="bg-[#EEEDED] px-5 py-10 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-10">
          
          {/* Hero Section (Statis) */}
          <section className="rounded-lg bg-white px-6 py-10 text-center shadow-sm lg:px-10 lg:py-14">
            <h1 className="text-3xl font-extrabold tracking-wide text-[#0D1282] lg:text-5xl">
              {hero.judul}
            </h1>
            <p className="mt-4 text-lg font-semibold text-[#D71313] lg:text-2xl">
              {hero.referensi}
            </p>
            <p className="mx-auto mt-6 max-w-4xl text-base leading-relaxed text-gray-700 lg:text-lg">
              {hero.isi}
            </p>
          </section>

          {/* Cards Dinamis */}
          <section className="grid gap-6 lg:grid-cols-3">
            
            {/* 1. Card Jadwal Ibadah */}
            <div className="flex min-h-[300px] flex-col justify-between rounded-lg bg-[#0D1282] px-6 py-8 text-white shadow-md">
              <div>
                <h2 className="text-2xl font-bold lg:text-3xl">Jadwal Ibadah</h2>
                <div className="mt-6 space-y-4">
                  {loading ? (
                    <p className="text-sm text-blue-200 animate-pulse">Memuat jadwal...</p>
                  ) : jadwalList.length === 0 ? (
                    <p className="text-sm text-blue-200">Belum ada jadwal ibadah terdaftar.</p>
                  ) : (
                    // Tampilkan 3 jadwal teratas untuk preview
                    jadwalList.slice(0, 3).map((item) => (
                      <div key={item.id}>
                        <p className="text-lg font-semibold">{item.category || item.nama_ibadah || item.nama}</p>
                        <p className="text-sm text-[#EEEDED]">{item.day_of_week || item.hari}, {item.start_time || item.jam} WIB</p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setActiveDetail(activeDetail === "jadwal" ? null : "jadwal")}
                  className="rounded-md bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-[#EEEDED]"
                >
                  {activeDetail === "jadwal" ? "Tutup" : "Detail"}
                </button>
              </div>
            </div>

            {/* 2. Card Pengumuman */}
            <div className="flex min-h-[300px] flex-col justify-between rounded-lg bg-[#0D1282] px-6 py-8 text-white shadow-md">
              <div>
                <h2 className="text-2xl font-bold lg:text-3xl">Pengumuman Terbaru</h2>
                <div className="mt-6 space-y-4">
                  {loading ? (
                    <p className="text-sm text-blue-200 animate-pulse">Memuat pengumuman...</p>
                  ) : pengumumanList.length === 0 ? (
                    <p className="text-sm text-blue-200">Belum ada pengumuman terbaru.</p>
                  ) : (
                    // Tampilkan 3 pengumuman teratas
                    pengumumanList.slice(0, 3).map((item) => (
                      <div key={item.id}>
                        <p className="text-base font-semibold line-clamp-1">{item.judul}</p>
                        <p className="text-sm text-[#EEEDED]">{formatTanggal(item.created_at)}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setActiveDetail(activeDetail === "pengumuman" ? null : "pengumuman")}
                  className="rounded-md bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-[#EEEDED]"
                >
                  {activeDetail === "pengumuman" ? "Tutup" : "Selengkapnya"}
                </button>
              </div>
            </div>

            {/* 3. Card Renungan */}
            <div className="flex min-h-[300px] flex-col justify-between rounded-lg bg-[#0D1282] px-6 py-8 text-white shadow-md">
              <div>
                <h2 className="text-2xl font-bold lg:text-3xl">Renungan Hari Ini</h2>
                {loading ? (
                  <p className="mt-4 text-sm text-blue-200 animate-pulse">Menyiapkan renungan...</p>
                ) : !renunganHariIni ? (
                  <p className="mt-4 text-sm text-blue-200">Belum ada renungan untuk hari ini.</p>
                ) : (
                  <>
                    <p className="mt-4 text-base font-semibold text-[#EEEDED] line-clamp-1">
                      {renunganHariIni.tema}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed lg:text-base line-clamp-3 italic">
                      "{renunganHariIni.isi}"
                    </p>
                  </>
                )}
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setActiveDetail(activeDetail === "renungan" ? null : "renungan")}
                  className="rounded-md bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-[#EEEDED]"
                >
                  {activeDetail === "renungan" ? "Tutup" : "Baca Renungan"}
                </button>
              </div>
            </div>
          </section>

          {/* Section Detail Expansion */}
          {activeDetail && (
            <section className="rounded-lg bg-white px-6 py-8 shadow-sm animate-fade-in">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-3xl font-extrabold text-[#0D1282]">
                  {activeDetail === "jadwal" && "Detail Jadwal Ibadah"}
                  {activeDetail === "pengumuman" && "Semua Pengumuman"}
                  {activeDetail === "renungan" && "Renungan Hari Ini"}
                </h2>

                <button
                  onClick={() => setActiveDetail(null)}
                  className="rounded-md bg-[#D71313] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  Tutup
                </button>
              </div>

              {/* Ekspansi Jadwal Ibadah */}
              {activeDetail === "jadwal" && (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {jadwalList.length === 0 ? <p className="text-gray-500">Tidak ada detail jadwal.</p> : 
                    jadwalList.map((item) => (
                      <div key={item.id} className="rounded-xl border border-[#EEEDED] bg-[#F9F9F9] p-5 shadow-sm">
                        <h3 className="text-xl font-bold text-[#0D1282]">
                          {item.category || item.nama_ibadah || item.nama}
                        </h3>
                        <div className="mt-4 space-y-2 text-sm text-gray-700">
                          <p><span className="font-semibold text-[#0D1282]">Hari:</span> {item.day_of_week || item.hari}</p>
                          <p><span className="font-semibold text-[#0D1282]">Jam:</span> {item.start_time || item.jam} WIB</p>
                          <p><span className="font-semibold text-[#0D1282]">Tempat:</span> {item.location || item.tempat}</p>
                        </div>
                      </div>
                  ))}
                </div>
              )}

              {/* Ekspansi Pengumuman */}
              {activeDetail === "pengumuman" && (
                <div className="space-y-4">
                  {pengumumanList.length === 0 ? <p className="text-gray-500">Tidak ada pengumuman.</p> : 
                    pengumumanList.map((item) => (
                      <div key={item.id} className="rounded-lg border border-[#EEEDED] bg-[#F9F9F9] p-5 shadow-sm">
                        <h3 className="text-xl font-bold text-[#0D1282]">{item.judul}</h3>
                        <p className="mt-2 text-sm font-medium text-[#D71313]">
                          Diterbitkan: {formatTanggal(item.created_at)}
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-gray-700 whitespace-pre-wrap">
                          {item.isi}
                        </p>
                      </div>
                  ))}
                </div>
              )}

              {/* Ekspansi Renungan */}
              {activeDetail === "renungan" && renunganHariIni && (
                <div className="max-w-4xl rounded-lg border border-[#EEEDED] bg-[#F9F9F9] p-6 shadow-sm">
                  <h3 className="text-2xl font-bold text-[#0D1282]">
                    {renunganHariIni.tema}
                  </h3>
                  <p className="mt-2 text-sm font-medium text-[#D71313]">
                    📖 {renunganHariIni.ayat_pokok}
                  </p>
                  <p className="mt-6 text-base leading-relaxed text-gray-700 whitespace-pre-wrap">
                    {renunganHariIni.isi}
                  </p>
                </div>
              )}
            </section>
          )}

          {/* Lokasi Gereja */}
          <section className="space-y-6 rounded-lg bg-white px-6 py-8 shadow-sm">
            <h2 className="text-3xl font-extrabold text-[#0D1282] lg:text-4xl">
              Lokasi Gereja
            </h2>

            <div className="h-[350px] w-full overflow-hidden rounded-lg border border-gray-200 shadow-sm relative">
              {/* PERBAIKAN: Menggunakan URL Embed Maps Akurat */}
              <iframe
                title="Lokasi GPdI Sibulele Balige"
                src="https://maps.google.com/maps?q=GPdI%20Sibulele%20Balige&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="space-y-3 text-base font-medium leading-relaxed text-gray-700 lg:text-lg">
              <p>{gereja?.alamat || "Balige, Toba"}</p>
              <p>Telepon : {gereja?.telepon || "-"}</p>
              <p>Email : {gereja?.email || "-"}</p>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}