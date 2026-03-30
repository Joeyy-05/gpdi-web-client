import { Link } from "react-router-dom";

const pages = [
  {
    title: "Home Page",
    path: "/home",
    description: "Halaman utama jemaat publik",
  },
  {
    title: "Profil Gereja",
    path: "/profil-gereja",
    description: "Informasi profil gereja",
  },
  {
    title: "Jadwal Ibadah",
    path: "/jadwal-ibadah",
    description: "Jadwal kegiatan jemaat",
  },
  {
    title: "Pelayanan",
    path: "/pelayanan",
    description: "Informasi pelayanan gereja",
  },
  {
    title: "Kontak",
    path: "/kontak",
    description: "Halaman kontak Gereja",
  },
  {
    title: "Galeri Kegiatan",
    path: "/galeri-kegiatan",
    description: "Galeri foto kegiatan",
  },
  {
    title: "Pengumuman Publik",
    path: "/pengumuman",
    description: "Daftar pengumuman publik jemaat",
  },
  {
    title: "Pengumuman Jemaat",
    path: "/pengumuman-jemaat",
    description: "Pengumuman internal jemaat",
  },
  {
    title: "Renungan",
    path: "/renungan",
    description: "Halaman renungan jemaat",
  },
  {
    title: "Ibadah Rayon",
    path: "/ibadah-rayon",
    description: "Jadwal ibadah rayon",
  },
  {
    title: "Request Surat",
    path: "/request-surat",
    description: "Form permintaan surat",
  },
  {
    title: "Manajemen Ibadah Rayon",
    path: "/manajemen-ibadah-rayon",
    description: "Halaman manajemen ibadah rayon",
  },
];

export default function AllPagesPreview() {
  return (
    <div
      className="min-h-screen bg-white text-[#0D1282]"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <main className="mx-auto max-w-[1200px] px-6 py-12">
        <section className="mb-10 rounded-3xl border border-slate-200 bg-[#0D1282] p-10 text-white shadow-sm">
          <h1 className="text-[42px] font-bold">Preview Semua Halaman</h1>
          <p className="mt-4 max-w-2xl text-[18px] text-[#EEEDED]">
            Semua page dari folder jemaat, jemaatpublik, dan ketuarayon tersedia
            tanpa login. Klik tombol di bawah untuk langsung membuka halaman
            masing-masing.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          {pages.map((page) => (
            <article
              key={page.path}
              className="rounded-3xl border border-slate-200 bg-[#EEEDED] p-8 shadow-sm"
            >
              <h2 className="text-[22px] font-semibold text-[#0D1282]">
                {page.title}
              </h2>
              <p className="mt-3 text-[16px] text-[#4A4A4A]">
                {page.description}
              </p>
              <Link
                to={page.path}
                className="mt-6 inline-flex rounded-xl bg-[#D71313] px-5 py-3 text-[16px] font-semibold text-white transition hover:bg-[#b10f10]"
              >
                Buka Halaman
              </Link>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
