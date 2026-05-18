import { Link, NavLink } from "react-router-dom";
// PERBAIKAN: Mengimpor logo langsung dari folder assets
import logo from "../assets/Logo-Gereja-Pantekosta-di-Indonesia-GPdI.png";
import { homeData } from "../data/homeData";

export default function PublicNavbar() {
  const navItems = [
    { label: "Beranda", path: "/" },
    { label: "Profil Gereja", path: "/profil-gereja" },
    { label: "Jadwal Ibadah", path: "/jadwal-ibadah" },
    { label: "Pelayanan", path: "/pelayanan" },
    { label: "Galeri Kegiatan", path: "/galeri-kegiatan" },
    { label: "Pengumuman", path: "/pengumuman" },
    { label: "Kontak", path: "/kontak" },
  ];

  return (
    <header className="w-full bg-[#0D1282] text-white sticky top-0 z-50 shadow-md" style={{ fontFamily: "Montserrat, sans-serif" }}>
      <div className="mx-auto flex h-[78px] w-full max-w-[1440px] items-center justify-between px-6 lg:px-10">
        
        <Link to="/" className="flex flex-shrink-0 items-center gap-3">
          {/* PERBAIKAN: Menggunakan variabel logo, disesuaikan tampilannya dengan JemaatNavbar */}
          <img src={logo} alt="Logo GPdI" className="h-[40px] w-[40px] object-contain rounded-full bg-white p-0.5" />
          <span className="hidden text-[18px] font-bold sm:block">GPdI Sibulele</span>
        </Link>

        {/* Menu Navigasi Murni Publik */}
        <nav className="hidden flex-1 items-center justify-center gap-x-4 lg:flex xl:gap-x-6">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} className={({ isActive }) => `whitespace-nowrap text-[14px] transition-all py-2 border-b-2 ${isActive ? "font-bold border-white" : "font-medium border-transparent hover:border-white/50"}`}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Karena komponen ini hanya muncul saat BELUM login, kita hanya butuh tombol LOGIN */}
        <div className="flex items-center gap-4">
          <Link to="/login" className="rounded-full bg-[#D71313] px-6 py-2.5 text-[14px] font-bold transition hover:bg-[#b51010] shadow-sm">
            LOGIN
          </Link>
        </div>

      </div>
    </header>
  );
}