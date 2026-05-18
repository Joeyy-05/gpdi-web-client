import React from "react";
import { homeData } from "../../data/homeData";

export default function KontakPage() {
  const { gereja, sosialMedia } = homeData;

  // Nomor telepon diproses agar aman digunakan untuk tautan WhatsApp (menghapus karakter non-angka)
  const waNumber = gereja?.telepon ? gereja.telepon.replace(/\D/g, "") : "";

  return (
    <div
      className="min-h-screen bg-white text-black"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <main className="pb-10">
        <div className="mx-auto w-full max-w-[1440px]">
          {/* Judul */}
          <section className="pt-[34px] text-center">
            <h1 className="text-[44px] font-extrabold tracking-[0.06em] text-[#0D1282]">
              Kontak & Lokasi
            </h1>

            <p className="mt-[18px] text-[18px] text-gray-600">
              Informasi Alamat dan Media Komunikasi Gereja
            </p>
          </section>

          {/* Banner */}
          <section className="mt-[48px] px-[30px]">
            <div className="mx-auto h-[360px] w-full max-w-[1365px] overflow-hidden rounded-2xl bg-[#D9D9D9] shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=2000&auto=format&fit=crop"
                alt="GPdI Sibulele Banner"
                className="h-full w-full object-cover"
              />
            </div>
          </section>

          {/* Divider */}
          <section className="mt-[40px]">
            <div className="h-[1px] w-full bg-gray-200" />
          </section>

          {/* Konten */}
          <section className="mt-[60px] px-[30px]">
            <div className="mx-auto grid w-full max-w-[1365px] grid-cols-1 gap-[40px] lg:grid-cols-2">
              {/* LEFT - DETAIL */}
              <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
                <h2 className="text-[28px] font-bold text-[#0D1282]">
                  Detail Kontak
                </h2>

                <h3 className="mt-[24px] text-[22px] font-bold text-[#D71313]">
                  {gereja?.nama || "GPdI Jemaat Sibulele"}
                </h3>

                <p className="mt-[12px] text-[18px] leading-[1.6] text-gray-700">
                  {gereja?.alamat || "Alamat Gereja"}
                </p>

                {/* Info List */}
                <div className="mt-[32px] space-y-[20px] text-[17px]">
                  
                  {/* Telepon */}
                  <div className="flex items-center gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                    </span>
                    <span className="font-semibold text-gray-800">
                      Telepon:
                    </span>
                    <span className="text-gray-600">{gereja?.telepon || "-"}</span>
                  </div>

                  {/* WhatsApp */}
                  <div className="flex items-center gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50 text-green-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                    </span>
                    <span className="font-semibold text-gray-800">
                      WhatsApp:
                    </span>

                    <a
                      href={`https://wa.me/${waNumber}`}
                      target="_blank"
                      rel="noreferrer"
                      className="ml-2 rounded-full bg-[#25D366] px-4 py-1 text-[14px] font-bold text-white transition hover:scale-105"
                    >
                      Chat WhatsApp
                    </a>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    </span>
                    <span className="font-semibold text-gray-800">Email:</span>
                    <span className="text-gray-600">{gereja?.email || "-"}</span>
                  </div>

                  {/* Facebook */}
                  <div className="flex items-center gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-800">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path></svg>
                    </span>
                    <span className="font-semibold text-gray-800">
                      Facebook:
                    </span>
                    <a
                      href={sosialMedia?.facebook || "#"}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline font-medium"
                    >
                      GPdI Sibulele Official
                    </a>
                  </div>
                </div>
              </div>

              {/* RIGHT - MAP */}
              <div>
                <h2 className="text-[28px] font-bold text-[#0D1282]">
                  Peta Lokasi
                </h2>

                <div className="mt-[24px] h-[360px] w-full overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
                  {/* PERBAIKAN: Menggunakan query akurat "GPdI Sibulele Balige" */}
                  <iframe
                    title="Lokasi GPdI Sibulele"
                    src="https://maps.google.com/maps?q=GPdI%20Sibulele%20Balige&t=&z=16&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                  />
                </div>

                {/* Buttons */}
                <div className="mt-[24px] flex flex-wrap gap-[15px]">
                  <a
                    // PERBAIKAN: Tautan langsung mencari titik gereja di tab baru
                    href="https://www.google.com/maps/search/?api=1&query=GPdI+Sibulele+Balige"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg bg-[#0D1282] px-[24px] py-[12px] text-[15px] font-bold text-white transition hover:bg-[#0a0e66]"
                  >
                    Lihat di Google Maps
                  </a>

                  <a
                    // PERBAIKAN: Tautan langsung membuka mode navigasi arah/rute ke gereja
                    href="https://www.google.com/maps/dir/?api=1&destination=GPdI+Sibulele+Balige"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg border-2 border-[#0D1282] px-[24px] py-[12px] text-[15px] font-bold text-[#0D1282] transition hover:bg-gray-50"
                  >
                    Dapatkan Arah
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}