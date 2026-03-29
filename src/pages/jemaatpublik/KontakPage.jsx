import React from "react";
import { homeData } from "../../data/homeData";

export default function KontakPage() {
  const { gereja, sosialMedia } = homeData;

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
                  {gereja.nama}
                </h3>

                <p className="mt-[12px] text-[18px] leading-[1.6] text-gray-700">
                  {gereja.alamat}
                </p>

                {/* Info */}
                <div className="mt-[32px] space-y-[20px] text-[17px]">
                  <div className="flex items-center gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-xl">
                      📞
                    </span>
                    <span className="font-semibold text-gray-800">
                      Telepon:
                    </span>
                    <span className="text-gray-600">{gereja.telepon}</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50 text-xl">
                      💬
                    </span>
                    <span className="font-semibold text-gray-800">
                      WhatsApp:
                    </span>

                    <a
                      href={`https://wa.me/${gereja.telepon.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="ml-2 rounded-full bg-[#25D366] px-4 py-1 text-[14px] font-bold text-white transition hover:scale-105"
                    >
                      Chat WhatsApp
                    </a>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-xl">
                      ✉️
                    </span>
                    <span className="font-semibold text-gray-800">Email:</span>
                    <span className="text-gray-600">{gereja.email}</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-xl">
                      📘
                    </span>
                    <span className="font-semibold text-gray-800">
                      Facebook:
                    </span>
                    <a
                      href={sosialMedia.facebook}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline"
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
                  <iframe
                    title="Lokasi GPdI Sibulele"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15945.71714138092!2d99.055848!3d2.332345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x302e046603a1608d%3A0x8e8e7a049f53e6b4!2sBalige%2C%20Toba%20Regency%2C%20North%20Sumatra!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                  />
                </div>

                {/* Buttons */}
                <div className="mt-[24px] flex gap-[15px]">
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=Balige"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg bg-[#0D1282] px-[24px] py-[12px] text-[15px] font-bold text-white transition hover:bg-[#0a0e66]"
                  >
                    Lihat di Google Maps
                  </a>

                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=Balige"
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
