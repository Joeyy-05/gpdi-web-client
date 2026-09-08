import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/Logo-Gereja-Pantekosta-di-Indonesia-GPdI.png";
import { ArrowUpRight, LogOut, Menu, UserCircle, X } from "lucide-react";
import { useAuth } from "../context/useAuth";

export default function JemaatNavbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 1. Definisikan menu dasar
  const baseNavItems = [
    { label: "Renungan Harian", path: "/renungan" },
    { label: "Jadwal Ibadah Rayon", path: "/ibadah-rayon" },
    { label: "Request Surat", path: "/request-surat" },
    { label: "Pengumuman Jemaat", path: "/pengumuman-jemaat" },
  ];

  // 2. Gabungkan secara kondisional dan immutable
  const navItems =
    user?.role === "ketua_rayon"
      ? [
          ...baseNavItems,
          { label: "Manajemen Ibadah", path: "/manajemen-ibadah" },
        ]
      : baseNavItems;

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout gagal:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0D1282] text-white shadow-lg shadow-[#0D1282]/10">
      <div className="mx-auto flex h-[82px] max-w-7xl items-center justify-between gap-5 px-5 sm:px-8 lg:px-10">
        <Link to="/ibadah-rayon" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Logo GPdI"
            className="h-10 w-10 rounded-full bg-white p-1 object-contain shadow-md sm:h-11 sm:w-11"
          />
          <span className="hidden text-sm font-extrabold leading-tight tracking-tight sm:block">
            GPdI
            <span className="block text-[10px] font-medium uppercase tracking-[0.18em] text-blue-200">
              Ruang Jemaat
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/10 p-1 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `rounded-full px-3 py-2 text-[12px] font-medium tracking-wide transition-colors duration-300 xl:px-3.5 ${
                  isActive
                    ? "bg-white font-bold text-[#0D1282] shadow-sm"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {isAuthenticated ? (
            <Link
              to="/profil"
              className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 transition-colors hover:bg-white/15"
              title="Ke Halaman Profil"
            >
              <UserCircle size={20} strokeWidth={2} className="text-white/80" />
              <span className="max-w-[130px] truncate text-[12px] font-semibold">
                {user?.nama_lengkap ||
                  user?.name ||
                  user?.email ||
                  "Jemaat GPdI"}
              </span>
            </Link>
          ) : (
            <span className="text-[13px] font-semibold whitespace-nowrap hidden md:block">
              Tamu
            </span>
          )}

          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="group flex items-center gap-2 rounded-full bg-[#D71313] px-4 py-2 text-xs font-bold text-white shadow-sm transition-colors hover:bg-red-800"
            >
              Keluar <LogOut size={14} />
            </button>
          ) : (
            <Link
              to="/login"
              className="rounded-full bg-blue-600 px-5 py-[6px] text-[12px] font-bold text-white shadow-sm transition-colors hover:bg-blue-700"
            >
              LOGIN
            </Link>
          )}
        </div>

        <button
          type="button"
          aria-label={isMenuOpen ? "Tutup menu" : "Buka menu"}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="rounded-lg p-2 transition hover:bg-white/10 lg:hidden"
        >
          {isMenuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>
      {isMenuOpen && (
        <div className="border-t border-white/10 bg-[#0a0e68] px-5 pb-5 pt-3 lg:hidden">
          <div className="mb-3 flex items-center gap-3 rounded-xl bg-white/10 p-3">
            <UserCircle size={22} className="text-blue-200" />
            <div className="min-w-0">
              <p className="truncate text-sm font-bold">
                {user?.nama_lengkap ||
                  user?.name ||
                  user?.email ||
                  "Jemaat GPdI"}
              </p>
              <p className="text-xs capitalize text-blue-200">
                {user?.role?.replace("_", " ") || "jemaat"}
              </p>
            </div>
          </div>
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-3 text-sm ${isActive ? "bg-white/15 font-bold text-white" : "text-blue-100 hover:bg-white/10"}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-3 flex gap-2">
            <Link
              to="/profil"
              onClick={() => setIsMenuOpen(false)}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-bold text-[#0D1282]"
            >
              Profil <ArrowUpRight size={15} />
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 rounded-lg bg-[#D71313] px-4 py-3 text-sm font-bold"
            >
              Keluar <LogOut size={15} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
