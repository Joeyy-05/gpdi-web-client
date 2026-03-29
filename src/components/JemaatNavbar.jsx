import { Link, NavLink } from "react-router-dom";
// import logo from "../assets/Logo-Gereja-Pantekosta-di-Indonesia-GPdI.jpg";
import { Bell } from "lucide-react";

export default function JemaatNavbar() {
  const navItems = [
    { label: "Renungan Harian", path: "/renungan" },
    { label: "Manajemen Ibadah Rayon", path: "/ibadah-rayon" },
    { label: "Request Surat", path: "/request-surat" },
    { label: "Pengumuman", path: "/pengumuman" },
  ];

  return (
    <header className="w-full bg-[#1E1B8F] text-white">
      <div className="mx-auto flex h-16 max-w-360 items-center justify-between px-6">

        {/* Left: Logo + Nama */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo GPdI" className="h-10 w-10 object-contain" />
          <span className="text-sm font-medium">
            Gereja Pantekosta di Indonesia
          </span>
        </div>

        {/* Center: Menu */}
        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-sm transition ${
                  isActive
                    ? "font-bold text-white"
                    : "text-white/80 hover:text-white"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Right: User */}
        <div className="flex items-center gap-4">
          <Bell size={20} />

          <span className="text-sm">Nama User</span>

          <button className="rounded-full bg-red-600 px-4 py-1.5 text-xs font-bold hover:bg-red-700">
            LOGOUT
          </button>
        </div>
      </div>
    </header>
  );
}