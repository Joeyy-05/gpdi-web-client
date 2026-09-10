import React from "react";
import { ArrowRight, Heart, Sparkles, Users, Church } from "lucide-react";
import { profilContent, riwayatPemimpin } from "../../data/profilData";

export default function ProfilGerejaPage() {
  return (
    <div
      className="min-h-screen bg-[#f7f8fb] text-slate-900"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <main className="pb-20">
        <section className="relative mx-5 overflow-hidden rounded-2xl border border-blue-100 bg-blue-50/70 px-6 py-7 text-[#0D1282] sm:mx-8 sm:px-10 sm:py-8 lg:mx-auto lg:max-w-7xl lg:px-12">
          <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_0.75fr]">
            <div>
              <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-[#D71313]">
                <span className="h-px w-8 bg-[#D71313]" /> Tentang kami
              </p>
              <h1 className="mt-3 max-w-2xl text-3xl font-extrabold leading-[1.08] tracking-tight text-[#0D1282] sm:text-4xl">
                Mengenal lebih dekat GPdI Sibulele.
              </h1>
            </div>
            <div className="border-t border-blue-200 pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0D1282]/60">
                Ruang jemaat
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Sebuah keluarga yang bertumbuh dalam iman, melayani dengan
                kasih, dan hadir menjadi berkat bagi lingkungan sekitar.
              </p>
            </div>
          </div>
          <div className="relative mt-7 border-t border-blue-200 pt-5">
            <div className="relative grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0D1282]/60">
                  Nilai yang kami hidupi
                </p>
                <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-slate-700 sm:text-base">
                  "Menjadi gereja yang bertumbuh dalam kasih, iman, dan
                  pengharapan."
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3 border-t border-blue-200 pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                <div>
                  <Heart size={19} className="text-red-300" />
                  <p className="mt-3 text-xs font-bold uppercase tracking-wider text-[#0D1282]">
                    Kasih
                  </p>
                  <p className="mt-1 text-[11px] leading-5 text-slate-500">
                    Melayani dengan tulus
                  </p>
                </div>
                <div>
                  <Sparkles size={19} className="text-amber-200" />
                  <p className="mt-3 text-xs font-bold uppercase tracking-wider text-[#0D1282]">
                    Iman
                  </p>
                  <p className="mt-1 text-[11px] leading-5 text-slate-500">
                    Bertumbuh dalam firman
                  </p>
                </div>
                <div>
                  <ArrowRight size={19} className="text-blue-200" />
                  <p className="mt-3 text-xs font-bold uppercase tracking-wider text-[#0D1282]">
                    Harapan
                  </p>
                  <p className="mt-1 text-[11px] leading-5 text-slate-500">
                    Menjadi berkat bersama
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-12 px-5 pt-16 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:px-12">
          <div className="h-[380px] overflow-hidden rounded-2xl shadow-lg sm:h-[470px]">
            <img
              src={profilContent.gambarSejarah}
              alt="Sejarah gereja"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D71313]">
              Perjalanan kami
            </p>
            <h2 className="mt-3 text-3xl font-extrabold text-[#0D1282] sm:text-4xl">
              Sejarah gereja
            </h2>
            <div className="mt-7 space-y-5 text-base leading-7 text-slate-600">
              {profilContent.sejarah.map((text, index) => (
                <p key={index}>{text}</p>
              ))}
            </div>

            {/* Timeline Kepemimpinan */}
            <div className="mt-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0D1282]/60 mb-4">
                Perjalanan kepemimpinan
              </p>
              <div className="space-y-3">
                {riwayatPemimpin.map((pemimpin, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className={`h-3 w-3 rounded-full flex-shrink-0 ${i === riwayatPemimpin.length - 1 ? "bg-[#D71313]" : "bg-[#0D1282]/30"}`} />
                    <div className="flex flex-1 items-center justify-between rounded-lg border border-slate-100 bg-white px-4 py-2.5 shadow-sm">
                      <span className="text-sm font-semibold text-[#0D1282]">{pemimpin.nama}</span>
                      <span className="text-xs font-bold text-slate-400">{pemimpin.periode}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex items-center gap-3 text-sm font-bold text-[#0D1282]">
              <Heart size={18} className="text-[#D71313]" /> Melayani dengan
              kasih dan ketulusan
            </div>
          </div>
        </section>

        {/* Statistik Gereja */}
        <section className="mx-auto mt-16 max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-5 rounded-2xl border border-blue-100 bg-blue-50/60 px-6 py-5">
              <Users size={32} className="text-[#0D1282] flex-shrink-0" />
              <div>
                <p className="text-3xl font-extrabold text-[#0D1282]">178</p>
                <p className="text-xs font-semibold text-slate-500 mt-0.5">Jemaat Aktif</p>
              </div>
            </div>
            <div className="flex items-center gap-5 rounded-2xl border border-red-100 bg-red-50/60 px-6 py-5">
              <Church size={32} className="text-[#D71313] flex-shrink-0" />
              <div>
                <p className="text-3xl font-extrabold text-[#D71313]">34</p>
                <p className="text-xs font-semibold text-slate-500 mt-0.5">Gereja GPDI Wilayah</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-24 max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="rounded-2xl bg-[#0D1282] p-8 text-white sm:p-10">
              <Sparkles className="text-blue-200" size={27} />
              <p className="mt-10 text-xs font-bold uppercase tracking-[0.2em] text-blue-200">
                Arah pelayanan
              </p>
              <h2 className="mt-3 text-3xl font-extrabold">Visi</h2>
              <p className="mt-6 text-lg italic leading-8 text-blue-50">
                "{profilContent.visi}"
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-8 sm:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D71313]">
                Yang kami hidupi
              </p>
              <h2 className="mt-3 text-3xl font-extrabold text-[#0D1282]">
                Misi
              </h2>
              <ul className="mt-6 space-y-4 text-base leading-6 text-slate-600">
                {profilContent.misi.map((m, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <ArrowRight
                      size={17}
                      className="mt-1 shrink-0 text-[#D71313]"
                    />
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
