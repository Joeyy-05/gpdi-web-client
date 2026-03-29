import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/Logo-Gereja-Pantekosta-di-Indonesia-GPdI.png";
import { Bell } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function JemaatNavbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { label: "Renungan Harian", path: "/renungan" },
    { label: "Manajemen Ibadah Rayon", path: "/ibadah-rayon" },
    { label: "Request Surat", path: "/request-surat" },
    { label: "Pengumuman", path: "/pengumuman" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="w-full bg-[#0D1282] text-white">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-8">
        
        {/* LEFT */}
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="Logo GPdI"
            className="h-9 w-9 object-contain"
          />
          <span className="text-[13px] font-medium whitespace-nowrap">
            Gereja Pantekosta di Indonesia
          </span>
        </div>

        {/* CENTER */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-[13px] transition ${
                  isActive
                    ? "font-semibold text-white"
                    : "text-white/80 hover:text-white"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* RIGHT */}
        <div className="flex items-center gap-6">
          <Bell size={20} strokeWidth={1.8} />

          <span className="text-[13px] whitespace-nowrap">
            {user?.name || "Nama User"}
          </span>

          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="rounded-full bg-[#D71313] px-5 py-[6px] text-[12px] font-bold text-black hover:opacity-90"
            >
              LOGOUT
            </button>
          ) : (
            <Link
              to="/login"
              className="rounded-full bg-blue-600 px-5 py-[6px] text-[12px] font-bold"
            >
              LOGIN
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}