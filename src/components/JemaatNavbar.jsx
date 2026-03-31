import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/Logo-Gereja-Pantekosta-di-Indonesia-GPdI.png";
import { UserCircle } from "lucide-react"; // Ikon Bell telah dihapus
import { useAuth } from "../context/AuthContext";

export default function JemaatNavbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // 1. Definisikan menu dasar
  const baseNavItems = [
    { label: "Renungan Harian", path: "/renungan" },
    { label: "Jadwal Ibadah Rayon", path: "/ibadah-rayon" },
    { label: "Request Surat", path: "/request-surat" },
    { label: "Pengumuman Jemaat", path: "/pengumuman-jemaat" },
  ];

  // 2. Gabungkan secara kondisional dan immutable
  const navItems = user?.role === 'ketua_rayon' 
    ? [...baseNavItems, { label: "Manajemen Ibadah", path: "/manajemen-ibadah" }]
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
    <header className="w-full bg-[#0D1282] text-white shadow-md sticky top-0 z-50">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-4 md:px-8">
        
        {/* LEFT - Logo & Title */}
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="Logo GPdI"
            className="h-10 w-10 object-contain rounded-full bg-white p-0.5"
          />
          <span className="text-[14px] font-bold tracking-wide whitespace-nowrap hidden sm:block">
            GPdI SIBULELE
          </span>
        </div>

        {/* CENTER - Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-[13px] font-medium tracking-wide transition-all duration-300 ${
                  isActive
                    ? "text-white border-b-2 border-white pb-1"
                    : "text-white/70 hover:text-white"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* RIGHT - Profil & Actions */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Fitur Notifikasi telah dihilangkan dari sini */}

          {isAuthenticated ? (
            <Link 
              to="/profil" 
              className="hidden md:flex items-center gap-2 transition-colors hover:text-gray-300 cursor-pointer"
              title="Ke Halaman Profil"
            >
              <UserCircle size={20} strokeWidth={2} className="text-white/80" />
              <span className="text-[13px] font-semibold whitespace-nowrap">
                {user?.nama_lengkap || user?.name || user?.email || "Jemaat GPdI"}
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
              className="rounded-full bg-[#D71313] px-5 py-[6px] text-[12px] font-bold text-white shadow-sm transition-colors hover:bg-red-800"
            >
              LOGOUT
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
      </div>
    </header>
  );
}