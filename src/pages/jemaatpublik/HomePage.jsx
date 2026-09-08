import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  ChevronDown,
  Clock3,
  MapPin,
  Megaphone,
  Quote,
  Sparkles,
  X,
} from "lucide-react";
import { homeData } from "../../data/homeData";
// Import Services untuk menarik data dinamis
import { getPublicWorship } from "../../services/eventService";
import {
  getAllPengumuman,
  getRenunganJemaat,
} from "../../services/contentService";

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
          getRenunganJemaat().catch(() => ({ data: [] })),
        ]);

        // 1. Set Data Jadwal
        setJadwalList(resWorship.data || []);

        // 2. Set Data Pengumuman (Filter hanya yang Aktif)
        const activePengumuman = (resPengumuman.data || []).filter(
          (item) => item.status === "Aktif",
        );
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
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div
      className="min-h-screen bg-[#f7f8fb] text-slate-900"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <main>
        <section className="relative isolate min-h-[590px] overflow-hidden bg-[#07104f] text-white lg:min-h-[650px]">
          <div className="absolute inset-0 -z-20 bg-[url('https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=85&w=2200&auto=format&fit=crop')] bg-cover bg-center" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#07104f]/95 via-[#07104f]/75 to-[#07104f]/20" />
          <div className="absolute bottom-0 left-0 right-0 -z-10 h-40 bg-gradient-to-t from-[#f7f8fb] to-transparent" />
          <div className="mx-auto flex min-h-[590px] max-w-7xl items-center px-5 py-20 sm:px-8 lg:min-h-[650px] lg:px-12">
            <div className="max-w-3xl">
              <div className="mb-7 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-blue-200">
                <span className="h-px w-10 bg-[#e33a3a]" />
                GPdI Jemaat Sibulele
              </div>
              <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
                {hero.judul}
              </h1>
              <p className="mt-6 flex items-center gap-3 text-base font-semibold text-red-200 sm:text-lg">
                <Quote size={18} fill="currentColor" />
                {hero.referensi}
              </p>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-blue-50/85 sm:text-base">
                {hero.isi}
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  to="/jadwal-ibadah"
                  className="group flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-[#0D1282] shadow-xl transition hover:bg-blue-50"
                >
                  Lihat jadwal{" "}
                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
                <Link
                  to="/profil-gereja"
                  className="rounded-full border border-white/40 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  Kenal gereja kami
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute bottom-8 right-8 hidden items-center gap-2 text-xs font-semibold text-white/70 lg:flex">
            <ChevronDown size={16} /> Jelajahi informasi jemaat
          </div>
        </section>

        <div className="mx-auto -mt-8 max-w-7xl px-5 sm:px-8 lg:px-12">
          <section className="relative z-10 grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10 md:grid-cols-3">
            <div className="border-b border-slate-200 p-6 md:border-b-0 md:border-r">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#0D1282]">
                <CalendarDays size={20} />
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Jadwal terdekat
              </p>
              <p className="mt-2 text-lg font-bold text-slate-900">
                {jadwalList[0]?.category ||
                  jadwalList[0]?.nama_ibadah ||
                  "Ibadah Raya Minggu"}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                {jadwalList[0]
                  ? `${jadwalList[0].day_of_week || jadwalList[0].hari}, ${jadwalList[0].start_time || jadwalList[0].jam} WIB`
                  : "Informasi segera hadir"}
              </p>
            </div>
            <div className="border-b border-slate-200 p-6 md:border-b-0 md:border-r">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-[#D71313]">
                <Megaphone size={20} />
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Pengumuman
              </p>
              <p className="mt-2 line-clamp-1 text-lg font-bold text-slate-900">
                {pengumumanList[0]?.judul || "Tidak ada pengumuman baru"}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                {pengumumanList[0]
                  ? formatTanggal(pengumumanList[0].created_at)
                  : "Tetap terhubung dengan kami"}
              </p>
            </div>
            <div className="p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <Sparkles size={20} />
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Renungan hari ini
              </p>
              <p className="mt-2 line-clamp-1 text-lg font-bold text-slate-900">
                {renunganHariIni?.tema || "Menanti renungan terbaru"}
              </p>
              <p className="mt-1 line-clamp-1 text-sm text-slate-500">
                {renunganHariIni?.ayat_pokok || "Firman yang menguatkan"}
              </p>
            </div>
          </section>
        </div>

        <div className="mx-auto max-w-7xl space-y-20 px-5 pb-20 pt-20 sm:px-8 lg:px-12">
          <section className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D71313]">
                Tetap terhubung
              </p>
              <h2 className="mt-3 text-3xl font-extrabold leading-tight text-[#0D1282] sm:text-4xl">
                Informasi yang membantu jemaat bertumbuh.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-slate-600">
              Temukan jadwal ibadah, kabar terbaru, dan renungan untuk menemani
              perjalanan iman Anda bersama keluarga GPdI Sibulele.
            </p>
          </section>

          <section className="grid gap-5 lg:grid-cols-3">
            <div className="flex min-h-[320px] flex-col justify-between rounded-2xl bg-[#0D1282] p-7 text-white shadow-lg shadow-blue-950/15">
              <div>
                <div className="flex items-center justify-between">
                  <CalendarDays size={25} />
                  <span className="text-xs font-bold uppercase tracking-widest text-blue-200">
                    Ibadah
                  </span>
                </div>
                <h2 className="mt-12 text-2xl font-bold">Jadwal ibadah</h2>
                <div className="mt-5 space-y-3">
                  {loading ? (
                    <p className="text-sm text-blue-200 animate-pulse">
                      Memuat jadwal...
                    </p>
                  ) : jadwalList.length === 0 ? (
                    <p className="text-sm text-blue-200">
                      Belum ada jadwal tersedia.
                    </p>
                  ) : (
                    jadwalList.slice(0, 3).map((item) => (
                      <div
                        key={item.id}
                        className="border-l border-blue-300/50 pl-3"
                      >
                        <p className="text-sm font-semibold">
                          {item.category || item.nama_ibadah || item.nama}
                        </p>
                        <p className="mt-1 text-xs text-blue-100">
                          {item.day_of_week || item.hari},{" "}
                          {item.start_time || item.jam} WIB
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
              <button
                onClick={() =>
                  setActiveDetail(activeDetail === "jadwal" ? null : "jadwal")
                }
                className="mt-8 flex items-center gap-2 text-sm font-bold text-white hover:text-blue-200"
              >
                {activeDetail === "jadwal"
                  ? "Tutup detail"
                  : "Lihat semua jadwal"}
                <ArrowRight size={16} />
              </button>
            </div>
            <div className="flex min-h-[320px] flex-col justify-between rounded-2xl border border-slate-200 bg-white p-7 shadow-lg shadow-slate-900/5">
              <div>
                <div className="flex items-center justify-between text-[#D71313]">
                  <Megaphone size={25} />
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    Kabar jemaat
                  </span>
                </div>
                <h2 className="mt-12 text-2xl font-bold text-[#0D1282]">
                  Pengumuman terbaru
                </h2>
                <div className="mt-5 space-y-4">
                  {loading ? (
                    <p className="text-sm text-slate-400 animate-pulse">
                      Memuat pengumuman...
                    </p>
                  ) : pengumumanList.length === 0 ? (
                    <p className="text-sm text-slate-500">
                      Belum ada pengumuman terbaru.
                    </p>
                  ) : (
                    pengumumanList.slice(0, 3).map((item) => (
                      <div
                        key={item.id}
                        className="border-b border-slate-100 pb-3 last:border-0"
                      >
                        <p className="line-clamp-1 text-sm font-semibold text-slate-800">
                          {item.judul}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          {formatTanggal(item.created_at)}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
              <button
                onClick={() =>
                  setActiveDetail(
                    activeDetail === "pengumuman" ? null : "pengumuman",
                  )
                }
                className="mt-8 flex items-center gap-2 text-sm font-bold text-[#D71313] hover:text-[#0D1282]"
              >
                {activeDetail === "pengumuman"
                  ? "Tutup detail"
                  : "Baca pengumuman"}
                <ArrowRight size={16} />
              </button>
            </div>
            <div className="flex min-h-[320px] flex-col justify-between rounded-2xl border border-slate-200 bg-[#fffaf0] p-7 shadow-lg shadow-slate-900/5">
              <div>
                <div className="flex items-center justify-between text-amber-700">
                  <Sparkles size={25} />
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-700/60">
                    Renungan
                  </span>
                </div>
                <h2 className="mt-12 text-2xl font-bold text-[#0D1282]">
                  Renungan hari ini
                </h2>
                {loading ? (
                  <p className="mt-5 text-sm text-slate-500 animate-pulse">
                    Menyiapkan renungan...
                  </p>
                ) : !renunganHariIni ? (
                  <p className="mt-5 text-sm text-slate-500">
                    Belum ada renungan terbaru.
                  </p>
                ) : (
                  <>
                    <p className="mt-5 line-clamp-1 text-sm font-bold text-slate-800">
                      {renunganHariIni.tema}
                    </p>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                      {renunganHariIni.isi}
                    </p>
                  </>
                )}
              </div>
              <button
                onClick={() =>
                  setActiveDetail(
                    activeDetail === "renungan" ? null : "renungan",
                  )
                }
                className="mt-8 flex items-center gap-2 text-sm font-bold text-amber-700 hover:text-[#0D1282]"
              >
                {activeDetail === "renungan" ? "Tutup detail" : "Baca renungan"}
                <ArrowRight size={16} />
              </button>
            </div>
          </section>

          {/* Cards Dinamis */}
          <section className="grid gap-6 lg:grid-cols-3">
            {/* 1. Card Jadwal Ibadah */}
            <div className="flex min-h-[300px] flex-col justify-between rounded-lg bg-[#0D1282] px-6 py-8 text-white shadow-md">
              <div>
                <h2 className="text-2xl font-bold lg:text-3xl">
                  Jadwal Ibadah
                </h2>
                <div className="mt-6 space-y-4">
                  {loading ? (
                    <p className="text-sm text-blue-200 animate-pulse">
                      Memuat jadwal...
                    </p>
                  ) : jadwalList.length === 0 ? (
                    <p className="text-sm text-blue-200">
                      Belum ada jadwal ibadah terdaftar.
                    </p>
                  ) : (
                    // Tampilkan 3 jadwal teratas untuk preview
                    jadwalList.slice(0, 3).map((item) => (
                      <div key={item.id}>
                        <p className="text-lg font-semibold">
                          {item.category || item.nama_ibadah || item.nama}
                        </p>
                        <p className="text-sm text-[#EEEDED]">
                          {item.day_of_week || item.hari},{" "}
                          {item.start_time || item.jam} WIB
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() =>
                    setActiveDetail(activeDetail === "jadwal" ? null : "jadwal")
                  }
                  className="rounded-md bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-[#EEEDED]"
                >
                  {activeDetail === "jadwal" ? "Tutup" : "Detail"}
                </button>
              </div>
            </div>

            {/* 2. Card Pengumuman */}
            <div className="flex min-h-[300px] flex-col justify-between rounded-lg bg-[#0D1282] px-6 py-8 text-white shadow-md">
              <div>
                <h2 className="text-2xl font-bold lg:text-3xl">
                  Pengumuman Terbaru
                </h2>
                <div className="mt-6 space-y-4">
                  {loading ? (
                    <p className="text-sm text-blue-200 animate-pulse">
                      Memuat pengumuman...
                    </p>
                  ) : pengumumanList.length === 0 ? (
                    <p className="text-sm text-blue-200">
                      Belum ada pengumuman terbaru.
                    </p>
                  ) : (
                    // Tampilkan 3 pengumuman teratas
                    pengumumanList.slice(0, 3).map((item) => (
                      <div key={item.id}>
                        <p className="text-base font-semibold line-clamp-1">
                          {item.judul}
                        </p>
                        <p className="text-sm text-[#EEEDED]">
                          {formatTanggal(item.created_at)}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() =>
                    setActiveDetail(
                      activeDetail === "pengumuman" ? null : "pengumuman",
                    )
                  }
                  className="rounded-md bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-[#EEEDED]"
                >
                  {activeDetail === "pengumuman" ? "Tutup" : "Selengkapnya"}
                </button>
              </div>
            </div>

            {/* 3. Card Renungan */}
            <div className="flex min-h-[300px] flex-col justify-between rounded-lg bg-[#0D1282] px-6 py-8 text-white shadow-md">
              <div>
                <h2 className="text-2xl font-bold lg:text-3xl">
                  Renungan Hari Ini
                </h2>
                {loading ? (
                  <p className="mt-4 text-sm text-blue-200 animate-pulse">
                    Menyiapkan renungan...
                  </p>
                ) : !renunganHariIni ? (
                  <p className="mt-4 text-sm text-blue-200">
                    Belum ada renungan untuk hari ini.
                  </p>
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
                  onClick={() =>
                    setActiveDetail(
                      activeDetail === "renungan" ? null : "renungan",
                    )
                  }
                  className="rounded-md bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-[#EEEDED]"
                >
                  {activeDetail === "renungan" ? "Tutup" : "Baca Renungan"}
                </button>
              </div>
            </div>
          </section>

          {/* Section Detail Expansion */}
          {activeDetail && (
            <section className="rounded-2xl border border-slate-200 bg-white px-6 py-8 shadow-lg shadow-slate-900/5 animate-fade-in sm:px-8">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-extrabold text-[#0D1282] sm:text-3xl">
                  {activeDetail === "jadwal" && "Detail Jadwal Ibadah"}
                  {activeDetail === "pengumuman" && "Semua Pengumuman"}
                  {activeDetail === "renungan" && "Renungan Hari Ini"}
                </h2>

                <button
                  onClick={() => setActiveDetail(null)}
                  className="flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-[#D71313] transition hover:bg-red-100"
                >
                  <X size={15} /> Tutup
                </button>
              </div>

              {/* Ekspansi Jadwal Ibadah */}
              {activeDetail === "jadwal" && (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {jadwalList.length === 0 ? (
                    <p className="text-gray-500">Tidak ada detail jadwal.</p>
                  ) : (
                    jadwalList.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-xl border border-slate-200 bg-slate-50 p-5"
                      >
                        <h3 className="text-xl font-bold text-[#0D1282]">
                          {item.category || item.nama_ibadah || item.nama}
                        </h3>
                        <div className="mt-4 space-y-2 text-sm text-gray-700">
                          <p>
                            <span className="font-semibold text-[#0D1282]">
                              Hari:
                            </span>{" "}
                            {item.day_of_week || item.hari}
                          </p>
                          <p>
                            <span className="font-semibold text-[#0D1282]">
                              Jam:
                            </span>{" "}
                            {item.start_time || item.jam} WIB
                          </p>
                          <p>
                            <span className="font-semibold text-[#0D1282]">
                              Tempat:
                            </span>{" "}
                            {item.location || item.tempat}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Ekspansi Pengumuman */}
              {activeDetail === "pengumuman" && (
                <div className="space-y-4">
                  {pengumumanList.length === 0 ? (
                    <p className="text-gray-500">Tidak ada pengumuman.</p>
                  ) : (
                    pengumumanList.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-xl border border-slate-200 bg-slate-50 p-5"
                      >
                        <h3 className="text-xl font-bold text-[#0D1282]">
                          {item.judul}
                        </h3>
                        <p className="mt-2 text-sm font-medium text-[#D71313]">
                          Diterbitkan: {formatTanggal(item.created_at)}
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-gray-700 whitespace-pre-wrap">
                          {item.isi}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Ekspansi Renungan */}
              {activeDetail === "renungan" && renunganHariIni && (
                <div className="max-w-4xl rounded-xl border border-slate-200 bg-slate-50 p-6">
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
          <section className="grid gap-8 rounded-2xl bg-[#0D1282] p-6 text-white shadow-xl shadow-blue-950/15 sm:p-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-200">
                Kunjungi kami
              </p>
              <h2 className="mt-3 text-3xl font-extrabold lg:text-4xl">
                Lokasi gereja
              </h2>
              <div className="mt-6 space-y-3 text-sm leading-6 text-blue-50">
                <p className="flex gap-3">
                  <MapPin size={18} className="mt-1 shrink-0 text-red-300" />
                  {gereja?.alamat || "Balige, Toba"}
                </p>
                <p className="flex gap-3">
                  <Clock3 size={18} className="mt-1 shrink-0 text-red-300" />
                  Ibadah dan pelayanan untuk seluruh keluarga
                </p>
              </div>
            </div>

            <div className="h-[300px] w-full overflow-hidden rounded-xl border border-white/20 shadow-sm relative lg:h-[350px]">
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
          </section>
        </div>
      </main>
    </div>
  );
}
