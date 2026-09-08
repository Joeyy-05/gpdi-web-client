import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
import logo from "../assets/Logo-Gereja-Pantekosta-di-Indonesia-GPdI.png";

export default function PublicNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
      className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0D1282] text-white shadow-lg shadow-[#0D1282]/10"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <div className="mx-auto flex h-[82px] w-full max-w-7xl items-center justify-between gap-5 px-5 sm:px-8 lg:px-10">
        <Link to="/" className="flex flex-shrink-0 items-center gap-3">
          <img
            src={logo}
            alt="Logo GPdI"
            className="h-10 w-10 rounded-full bg-white p-1 object-contain shadow-md sm:h-11 sm:w-11"
          />
          <span className="hidden text-sm font-extrabold leading-tight tracking-tight sm:block">
            GPdI
            <span className="block text-[10px] font-medium uppercase tracking-[0.18em] text-blue-200">
              Sibulele
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/10 p-1 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `whitespace-nowrap rounded-full px-3 py-2 text-[12px] transition-colors xl:px-3.5 ${isActive ? "bg-white font-bold text-[#0D1282] shadow-sm" : "font-medium text-blue-100 hover:bg-white/10 hover:text-white"}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            to="/login"
            className="group flex items-center gap-2 rounded-full bg-[#D71313] px-4 py-2.5 text-xs font-bold shadow-md shadow-red-950/20 transition hover:bg-[#b51010] xl:px-5"
          >
            Masuk{" "}
            <ArrowUpRight
              size={15}
              strokeWidth={2.5}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        <button
          type="button"
          aria-label={isMenuOpen ? "Tutup menu" : "Buka menu"}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="rounded-lg p-2 text-white transition hover:bg-white/10 lg:hidden"
        >
          {isMenuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="border-t border-white/10 bg-[#0a0e68] px-5 pb-5 pt-3 lg:hidden">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-3 text-sm ${isActive ? "bg-white/15 font-bold text-white" : "text-blue-100 hover:bg-white/10 hover:text-white"}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <Link
            to="/login"
            onClick={() => setIsMenuOpen(false)}
            className="mt-3 flex items-center justify-center rounded-lg bg-[#D71313] px-4 py-3 text-sm font-bold text-white"
          >
            Masuk ke akun
          </Link>
        </div>
      )}
    </header>
  );
}
