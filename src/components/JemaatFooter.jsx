import { Link } from "react-router-dom";

export default function JemaatFooter() {
  return (
    <footer className="w-full border-t border-gray-300 bg-[#EDEDED] px-6 py-6">
      <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-6 md:flex-row md:items-start">
        <div>
          <p className="mb-3 text-[14px] font-semibold text-black">
            Sistem Informasi GPdI Jemaat Sibulele
          </p>
          <p className="text-[13px] text-gray-700">Versi Sistem: versi</p>
          <p className="text-[13px] text-gray-700">Tahun: tahun</p>
        </div>

        <div className="grid gap-5 text-[13px] text-gray-800 md:grid-cols-2 md:items-start">
          <div>
            <p className="mb-3 text-[14px] font-semibold text-black">
              Halaman Publik
            </p>
            <ul className="space-y-2">
              <li>
                <Link to="/home" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:underline">
                  Semua Halaman
                </Link>
              </li>
              <li>
                <Link to="/profil-gereja" className="hover:underline">
                  Profil Gereja
                </Link>
              </li>
              <li>
                <Link to="/jadwal-ibadah" className="hover:underline">
                  Jadwal Ibadah
                </Link>
              </li>
              <li>
                <Link to="/pelayanan" className="hover:underline">
                  Pelayanan
                </Link>
              </li>
              <li>
                <Link to="/kontak" className="hover:underline">
                  Kontak
                </Link>
              </li>
              <li>
                <Link to="/galeri-kegiatan" className="hover:underline">
                  Galeri Kegiatan
                </Link>
              </li>
              <li>
                <Link to="/pengumuman" className="hover:underline">
                  Pengumuman Publik
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-3 text-[14px] font-semibold text-black">
              Halaman Jemaat & Ketua Rayon
            </p>
            <ul className="space-y-2">
              <li>
                <Link to="/pengumuman-jemaat" className="hover:underline">
                  Pengumuman Jemaat
                </Link>
              </li>
              <li>
                <Link to="/renungan" className="hover:underline">
                  Renungan
                </Link>
              </li>
              <li>
                <Link to="/ibadah-rayon" className="hover:underline">
                  Ibadah Rayon
                </Link>
              </li>
              <li>
                <Link to="/request-surat" className="hover:underline">
                  Request Surat
                </Link>
              </li>
              <li>
                <Link to="/manajemen-ibadah-rayon" className="hover:underline">
                  Manajemen Ibadah Rayon
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
