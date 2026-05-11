import React, { useState } from "react";
import {
  pengakuanIman,
  strukturPelayanan,
  profilContent,
} from "../../data/profilData";

export default function ProfilGerejaPage() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [pendetaList, setPendetaList] = useState([]);
  const [loadingPendeta, setLoadingPendeta] = useState(true);

  React.useEffect(() => {
    const fetchPendeta = async () => {
      try {
        const response = await fetch("http://localhost:8001/api/users?role=pendeta");
        const result = await response.json();
        setPendetaList(result.data || []);
      } catch (error) {
        console.error("Gagal mengambil data pendeta:", error);
      } finally {
        setLoadingPendeta(false);
      }
    };
    fetchPendeta();
  }, []);

  const displayedIman = isExpanded ? pengakuanIman : pengakuanIman.slice(0, 4);

  return (
    <div className="min-h-screen bg-white text-black" style={{ fontFamily: "Montserrat, sans-serif" }}>
      <main className="pb-10">
        <div className="mx-auto w-full max-w-[1440px]">

          {/* HEADER */}
          <section className="pt-[34px] text-center">
            <h1 className="text-[44px] font-extrabold tracking-[0.06em] text-[#0D1282]">
              Profil Gereja
            </h1>
            <p className="mt-[18px] text-[18px] text-gray-600">
              Mengenal Lebih Dekat GPdI Jemaat Sibulele
            </p>
          </section>

          {/* BANNER */}
          <section className="mt-[48px] px-[22px]">
            <div className="mx-auto h-[372px] w-full max-w-[1365px] overflow-hidden rounded-2xl bg-[#D9D9D9] shadow-lg">
              <img
                src={profilContent.gambarBanner}
                alt="Banner"
                className="h-full w-full object-cover"
              />
            </div>
          </section>

          {/* SEJARAH GEREJA */}
          <section className="mt-[100px] px-[40px]">
            <div className="mx-auto grid w-full max-w-[1300px] grid-cols-1 gap-x-[90px] gap-y-[40px] lg:grid-cols-[450px_1fr]">
              <div className="h-[420px] rounded-2xl overflow-hidden shadow-md">
                <img
                  src={profilContent.gambarSejarah}
                  alt="Sejarah"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-[26px] font-bold text-[#0D1282] mb-4">
                  Sejarah Gereja
                </h2>
                <div className="space-y-4 text-[17px] leading-relaxed text-gray-700">
                  {profilContent.sejarah.map((text, index) => (
                    <p key={index}>{text}</p>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* =========== */}
          <section className="mt-[80px] px-[40px]">
            <div className="mx-auto w-full max-w-[900px] text-center">
              <h2 className="text-[26px] font-bold text-[#0D1282] mb-6">
                Sejarah Singkat Pendeta
              </h2>

              <div className="space-y-4 text-[17px] leading-relaxed text-gray-700">
                <p>
                  Pelayanan pendeta di GPdI Jemaat Sibulele telah dimulai sejak
                  awal berdirinya gereja, dengan tujuan utama menggembalakan
                  jemaat dan membangun kehidupan rohani yang kuat berdasarkan
                  firman Tuhan.
                </p>
                <p>
                  Dari waktu ke waktu, terjadi pergantian dan regenerasi pendeta
                  yang membawa semangat baru dalam pelayanan, namun tetap
                  mempertahankan nilai-nilai iman yang telah diajarkan sejak
                  awal. Setiap pendeta memberikan kontribusi dalam pertumbuhan
                  iman jemaat melalui khotbah, pelayanan pastoral, dan kegiatan
                  sosial.
                </p>
                <p>
                  Hingga saat ini, para pendeta terus melayani dengan penuh
                  dedikasi, menjadi teladan dalam kasih, serta membimbing jemaat
                  untuk hidup sesuai dengan ajaran Kristus.
                </p>
              </div>
            </div>
          </section>
          {/* =================================================== */}

          {/* VISI MISI */}
          <section className="mt-[110px] px-[32px] text-center bg-gray-50 py-20">
            <h2 className="text-[30px] font-bold text-[#0D1282] mb-12">
              Visi & Misi
            </h2>
            <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-8 md:grid-cols-2">
              <div className="bg-white p-10 rounded-xl shadow-sm border-t-4 border-[#0D1282]">
                <h3 className="text-xl font-bold mb-4">VISI</h3>
                <p className="text-gray-600 italic">
                  "{profilContent.visi}"
                </p>
              </div>
              <div className="bg-white p-10 rounded-xl shadow-sm border-t-4 border-[#D71313]">
                <h3 className="text-xl font-bold mb-4">MISI</h3>
                <ul className="text-left list-disc pl-5 space-y-2 text-gray-600">
                  {profilContent.misi.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}