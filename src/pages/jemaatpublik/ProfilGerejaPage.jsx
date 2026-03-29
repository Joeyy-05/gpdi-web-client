import React, { useState } from "react";
import {
  pengakuanIman,
  strukturPelayanan,
  profilContent,
} from "../../data/profilData";

export default function ProfilGerejaPage() {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayedIman = isExpanded ? pengakuanIman : pengakuanIman.slice(0, 4);

  return (
    <div
      className="min-h-screen bg-white text-black"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <main className="pb-10">
        <div className="mx-auto w-full max-w-[1440px]">
          {/* Judul */}
          <section className="pt-[34px] text-center">
            <h1 className="text-[44px] font-extrabold tracking-[0.06em] text-black">
              Profil Gereja
            </h1>

            <p className="mt-[18px] text-[18px] font-normal text-black">
              Mengenal Lebih Dekat GPdI Jemaat Sibulele
            </p>
          </section>

          {/* Banner */}
          <section className="mt-[48px] px-[22px]">
            <div className="mx-auto h-[372px] w-full max-w-[1365px] overflow-hidden rounded-2xl bg-[#D9D9D9] shadow-lg">
              <img
                src={profilContent.gambarBanner}
                alt="Gedung GPdI Sibulele"
                className="h-full w-full object-cover"
              />
            </div>
          </section>

          {/* Sejarah */}
          <section className="mt-[115px] px-[40px]">
            <div className="mx-auto grid w-full max-w-[1300px] grid-cols-1 items-start gap-x-[90px] gap-y-[40px] lg:grid-cols-[450px_1fr]">
              <div className="mx-auto h-[420px] w-full max-w-[430px] overflow-hidden rounded-2xl bg-[#D9D9D9] shadow-md lg:mx-0">
                <img
                  src={profilContent.gambarSejarah}
                  alt="Sejarah Gereja"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="max-w-[690px]">
                <h2 className="text-[22px] font-medium text-black">
                  Sejarah GPDI Jemaat Sibulele
                </h2>

                <div className="mt-[14px] space-y-[8px] text-[16px] leading-[1.45] text-black">
                  {profilContent.sejarah.map((text, index) => (
                    <p key={index}>{text}</p>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Visi & Misi */}
          <section className="mt-[110px] px-[32px] text-center">
            <h2 className="text-[22px] font-medium text-black">
              Visi & Misi Gereja
            </h2>

            <div className="mx-auto mt-[72px] grid w-full max-w-[1270px] grid-cols-1 gap-x-[170px] gap-y-[40px] md:grid-cols-2">
              <div className="mx-auto flex h-[215px] w-full max-w-[540px] flex-col items-center bg-[#EEEDED] px-[28px] pt-[48px] text-center">
                <h3 className="text-[20px] font-medium text-black">VISI</h3>

                <p className="mt-[22px] max-w-[420px] text-[16px] leading-[1.45] text-black">
                  {profilContent.visi}
                </p>
              </div>

              <div className="mx-auto flex h-[215px] w-full max-w-[540px] flex-col items-center bg-[#EEEDED] px-[28px] pt-[48px] text-center">
                <h3 className="text-[20px] font-medium text-black">MISI</h3>

                <ul className="mt-[18px] w-full max-w-[430px] list-disc pl-5 text-left text-[16px] leading-[1.35] text-black">
                  {profilContent.misi.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Pengakuan Iman */}
          <section className="mt-[120px] px-[36px]">
            <div className="mx-auto w-full max-w-[1300px] text-center">
              <h2 className="text-[22px] font-medium text-black">
                Pengakuan Iman
              </h2>

              <ol className="mt-[34px] space-y-[16px] text-left text-[16px] leading-[1.45] text-black">
                {displayedIman.map((item, index) => (
                  <li key={index} className="list-decimal">
                    <span>{item}</span>
                  </li>
                ))}
              </ol>

              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-[42px] rounded-[18px] bg-[#D71313] px-[34px] py-[12px] text-[18px] font-normal text-white transition hover:bg-[#b51010]"
              >
                {isExpanded ? "Tutup" : "Baca Selengkapnya"}
              </button>
            </div>
          </section>

          {/* Struktur Pelayanan */}
          <section className="mt-[125px] px-[20px] text-center">
            <h2 className="text-[22px] font-medium text-black">
              Struktur Pelayanan
            </h2>

            <div className="mx-auto mt-[54px] flex w-full max-w-[500px] flex-col items-center">
              {strukturPelayanan.map((item, index) => (
                <div key={item} className="flex flex-col items-center">
                  <div className="flex h-[42px] w-[220px] items-center justify-center rounded-[12px] border-[4px] border-[#0D1282] bg-white text-[14px] font-normal text-[#0D1282]">
                    {item}
                  </div>

                  {index !== strukturPelayanan.length - 1 && (
                    <div className="h-[48px] w-[4px] bg-[#0D1282]" />
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
