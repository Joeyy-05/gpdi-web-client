import { Link, NavLink } from "react-router-dom";
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
    <header
      className="w-full bg-[#0D1282] text-white"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <div className="mx-auto flex h-[78px] w-full max-w-[1440px] items-center justify-between px-6 lg:px-10">
        {/* Left: Logo */}
        <Link to="/" className="flex flex-shrink-0 items-center gap-3">
          <img
            src={homeData.gereja.logo}
            alt="Logo GPdI"
            className="h-[40px] w-[40px] object-contain"
          />
          <span className="hidden text-[18px] font-bold leading-tight text-white sm:block">
            Gereja Pantekosta di Indonesia
          </span>
        </Link>

        {/* Center: Navigation */}
        <nav className="hidden flex-1 items-center justify-center gap-x-4 lg:flex xl:gap-x-8">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `whitespace-nowrap text-[15px] leading-none transition-all duration-200 py-2 border-b-2 xl:text-[16px] ${
                  isActive
                    ? "font-bold text-white border-white"
                    : "font-medium text-white/80 border-transparent hover:text-white hover:border-white/50"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Right: Login */}
        <div className="flex flex-shrink-0 justify-end lg:min-w-[120px]">
          <Link
            to="/login"
            className="rounded-full bg-[#D71313] px-6 py-2.5 text-[14px] font-bold leading-none text-white transition hover:bg-[#b51010] hover:scale-[1.05] xl:px-8 xl:text-[15px]"
          >
            LOGIN
          </Link>
        </div>
      </div>
    </header>
  );
}
