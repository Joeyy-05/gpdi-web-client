import React, { useState, useEffect } from "react";
import {
  ArrowUpRight,
  Bell,
  Mail,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { getAllSurat, getAllNotifikasi } from "../../services/adminService";
import { useAuth } from "../../context/useAuth";

const JemaatDashboard = () => {
  const { user } = useAuth();
  const [suratList, setSuratList] = useState([]);
  const [notifikasiList, setNotifikasiList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJemaatData = async () => {
      setIsLoading(true);
      try {
        // Mengambil data surat dan notifikasi secara bersamaan
        const [resSurat, resNotif] = await Promise.all([
          getAllSurat(),
          getAllNotifikasi(),
        ]);

        // Hanya tampilkan surat yang statusnya is_active = true
        const activeSurats = (resSurat?.data || []).filter((s) => s.is_active);
        setSuratList(activeSurats);

        setNotifikasiList(resNotif?.data || []);
      } catch (error) {
        console.error("Gagal memuat data jemaat:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJemaatData();
  }, []);

  return (
    <div className="min-h-screen bg-[#f7f8fb] px-5 py-8 font-sans sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl space-y-8 animate-fade-in-up">
        {/* HEADER */}
        <div className="relative overflow-hidden rounded-2xl bg-[#0D1282] p-7 text-white shadow-xl shadow-blue-950/15 sm:p-9">
          <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <div>
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-200">
              <Sparkles size={15} /> Portal jemaat
            </p>
            <h1 className="relative mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Syalom, {user?.name || "Jemaat"}.
            </h1>
            <p className="relative mt-3 max-w-xl text-sm leading-6 text-blue-100 sm:text-base">
              Selamat datang di Portal Pelayanan Jemaat GPdI.
            </p>
          </div>
          <div className="relative hidden h-16 w-16 items-center justify-center rounded-full bg-white/15 text-2xl font-bold sm:flex">
            {user?.name ? user.name.charAt(0).toUpperCase() : "J"}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <Mail size={19} className="text-[#0D1282]" />
            <p className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-400">
              Layanan aktif
            </p>
            <p className="mt-1 text-2xl font-extrabold text-slate-900">
              {isLoading ? "-" : suratList.length}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              layanan surat tersedia
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <Bell size={19} className="text-[#D71313]" />
            <p className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-400">
              Pemberitahuan
            </p>
            <p className="mt-1 text-2xl font-extrabold text-slate-900">
              {isLoading ? "-" : notifikasiList.length}
            </p>
            <p className="mt-1 text-xs text-slate-500">informasi untuk Anda</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <Sparkles size={19} className="text-amber-600" />
            <p className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-400">
              Akses cepat
            </p>
            <p className="mt-1 text-lg font-extrabold text-slate-900">
              Profil jemaat
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Pastikan data Anda terbaru
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* KOLOM KIRI: REQUEST SURAT */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="flex items-center gap-2 text-xl font-extrabold text-slate-900">
              <Mail className="text-[#0D1282]" size={21} /> Layanan administrasi
              surat
            </h2>

            {isLoading ? (
              <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-4 py-1">
                  <div className="h-20 bg-slate-200 rounded"></div>
                </div>
              </div>
            ) : suratList.length === 0 ? (
              <div className="bg-white p-6 rounded-xl border border-slate-100 text-center text-slate-500 shadow-sm">
                Belum ada layanan surat yang aktif saat ini.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {suratList.map((surat) => (
                  <div
                    key={surat.id}
                    className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    <h3 className="font-bold text-slate-800 mb-2">
                      {surat.nama_surat}
                    </h3>
                    <p className="text-xs text-slate-500 mb-4 line-clamp-2">
                      Ajukan permohonan {surat.nama_surat} langsung melalui
                      WhatsApp Admin Gereja.
                    </p>
                    <a
                      href={surat.whatsapp_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                    >
                      <MessageCircle size={17} /> Ajukan sekarang{" "}
                      <ArrowUpRight size={15} />
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* KOLOM KANAN: NOTIFIKASI */}
          <div className="space-y-4">
            <h2 className="flex items-center gap-2 text-xl font-extrabold text-slate-900">
              <Bell className="text-amber-500" size={21} /> Pemberitahuan
            </h2>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              {isLoading ? (
                <div className="p-6 text-center text-sm text-slate-500 animate-pulse">
                  Memeriksa notifikasi...
                </div>
              ) : notifikasiList.length === 0 ? (
                <div className="p-6 text-center text-sm text-slate-500">
                  Belum ada pemberitahuan baru.
                </div>
              ) : (
                <ul className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto">
                  {notifikasiList.map((notif) => (
                    <li
                      key={notif.id}
                      className={`p-4 hover:bg-slate-50 transition ${!notif.is_read ? "bg-blue-50/50" : ""}`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-semibold text-sm text-slate-800">
                          {notif.judul}
                        </span>
                        {!notif.is_read && (
                          <span className="h-2 w-2 rounded-full bg-blue-600 mt-1.5"></span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600">{notif.isi}</p>
                      <p className="text-[10px] text-slate-400 mt-2">
                        {new Date(notif.created_at).toLocaleDateString(
                          "id-ID",
                          {
                            day: "numeric",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          },
                        )}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JemaatDashboard;
