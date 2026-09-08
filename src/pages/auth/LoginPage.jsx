import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginAPI } from "../../services/authService";
import { useAuth } from "../../context/useAuth";
import logo from "../../assets/Logo-Gereja-Pantekosta-di-Indonesia-GPdI.png";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  // PERBAIKAN 1: Ekstrak isAuthenticated dari context
  // 1. Pastikan Anda juga mengekstrak 'user' dari useAuth
  const { login, isAuthenticated, user } = useAuth();

  // 2. Perbarui useEffect agar memeriksa role sebelum melempar (redirect)
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === "pendeta" || user.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/ibadah-rayon");
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setIsLoading(true);

    try {
      const response = await loginAPI(email, password);
      if (response.status === "success") {
        // Eksekusi fungsi login di Context untuk menyimpan token JWT
        login(response.data.access_token, response.data.user);

        // --- LOGIKA REDIRECT BERDASARKAN ROLE ---
        const userRole = response.data.user.role;

        if (userRole === "pendeta" || userRole === "admin") {
          navigate("/dashboard"); // Lempar ke Admin
        } else {
          // PERBAIKAN 3: Lempar ke Jadwal Ibadah Rayon sebagai Landing Page Jemaat
          navigate("/ibadah-rayon");
        }
      }
    } catch (error) {
      setErrorMsg(
        error.message ||
          "Gagal masuk. Periksa kembali email dan kata sandi Anda.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f7f8fb] font-sans">
      <div className="relative hidden overflow-hidden bg-[#07104f] px-12 pb-14 pt-14 text-white lg:flex lg:w-[42%] lg:flex-col lg:justify-between xl:px-16">
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border-[48px] border-white/10" />
        <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full border-[64px] border-[#D71313]/25" />
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white p-1 shadow-lg">
              <img
                src={logo}
                alt="Logo GPdI"
                className="h-full w-full object-contain"
              />
            </div>
            <span className="text-sm font-bold tracking-[0.18em]">
              GPdI SIBULELE
            </span>
          </div>
          <div className="mt-28 max-w-md">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-200">
              Portal jemaat
            </p>
            <h2 className="mt-5 text-5xl font-extrabold leading-[1.08]">
              Bertumbuh dalam iman, melayani dengan kasih.
            </h2>
            <p className="mt-7 max-w-sm text-base leading-7 text-blue-100">
              Satu ruang untuk mengikuti informasi gereja, renungan, jadwal
              rayon, dan pelayanan jemaat GPdI Sibulele.
            </p>
          </div>
        </div>
        <div className="relative z-10 flex items-center gap-3 text-sm text-blue-200">
          <span className="h-px w-10 bg-red-300" />
          Melayani bersama dalam kasih
        </div>
      </div>

      {/* SISI KANAN: Formulir Login */}
      <div className="flex w-full items-center justify-center px-5 py-10 sm:px-10 lg:w-[58%] lg:px-16 xl:px-24">
        <div className="w-full max-w-[460px]">
          {/* Header Formulir */}
          <div className="mb-9 text-center sm:text-left">
            <div className="mb-8 flex items-center justify-center gap-3 sm:justify-start">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0D1282] text-lg font-bold text-white shadow-md">
                G
              </div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900">
                GPdI Sibulele
              </span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Selamat Datang Kembali
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              Masuk untuk mengakses layanan dan informasi jemaat.
            </p>
          </div>

          {/* Notifikasi Error */}
          {errorMsg && (
            <div className="mb-6 flex items-start rounded-xl border border-red-200 bg-red-50 p-4">
              <svg
                className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm text-red-700">{errorMsg}</span>
            </div>
          )}

          {/* Formulir */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Input Email */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-slate-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm transition focus:border-[#0D1282] focus:ring-4 focus:ring-blue-100"
                  placeholder="Masukkan email Anda"
                  required
                />
              </div>
            </div>

            {/* Input Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Kata Sandi
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-slate-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-12 text-sm transition focus:border-[#0D1282] focus:ring-4 focus:ring-blue-100"
                  placeholder="Masukkan kata sandi"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-blue-600 transition"
                >
                  {showPassword ? (
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Opsi Tambahan */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-[#0D1282] focus:ring-[#0D1282]"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-slate-600"
                >
                  Ingat saya
                </label>
              </div>
              <div className="text-sm">
                <span className="font-medium text-slate-400">
                  Hubungi admin untuk reset password
                </span>
              </div>
            </div>

            {/* Tombol Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className={`flex w-full items-center justify-center rounded-xl bg-[#0D1282] px-4 py-3.5 font-bold text-white shadow-lg shadow-blue-950/15 transition hover:bg-[#0a0e68] ${isLoading ? "cursor-not-allowed opacity-70" : ""}`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Memproses...
                </>
              ) : (
                "Masuk"
              )}
            </button>
          </form>

          {/* Tautan Kembali */}
          <div className="mt-8 text-center text-sm text-slate-500">
            <Link
              to="/"
              className="inline-flex items-center font-medium transition hover:text-[#0D1282]"
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                ></path>
              </svg>
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
