import { useMemo, useState } from "react";
import { pelayananData } from "../../data/pelayananData";

export default function PelayananPage() {
  const { hero, items, adminWhatsApp } = pelayananData;
  const [selectedItem, setSelectedItem] = useState(null);

  const daftarPelayananLink = useMemo(() => {
    const text =
      "Shalom admin, saya ingin mendaftar pelayanan di GPdI Jemaat Sibulele.";
    return `https://wa.me/${adminWhatsApp}?text=${encodeURIComponent(text)}`;
  }, [adminWhatsApp]);

  const getDetailWhatsappLink = (item) => {
    const text = `Shalom admin, saya ingin mengetahui lebih lanjut tentang ${item.nama}.`;
    return `https://wa.me/${adminWhatsApp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div
      className="min-h-screen bg-[#F8F9FA] text-black"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <main className="pb-20">
        <div className="mx-auto w-full max-w-[1450px]">
          {/* Judul */}
          <section className="pt-[60px] text-center px-6">
            <h1 className="text-[44px] font-extrabold tracking-[0.06em] text-[#0D1282]">
              {hero.judul}
            </h1>
            <p className="mt-6 text-[20px] font-medium text-gray-600">
              {hero.subjudul}
            </p>
          </section>

          {/* Banner */}
          <section className="mt-14 px-[30px]">
            <div className="mx-auto h-[385px] w-full max-w-[1365px] overflow-hidden rounded-2xl bg-[#D9D9D9] shadow-xl">
              <img
                src={hero.gambarUtama}
                alt="Banner Pelayanan"
                className="h-full w-full object-cover"
              />
            </div>
          </section>

          {/* Grid Pelayanan */}
          <section className="mt-[80px] px-[30px]">
            <div className="grid grid-cols-1 justify-items-center gap-x-[40px] gap-y-[40px] md:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="group flex w-full max-w-[435px] flex-col items-center rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-md"
                >
                  <div className="h-[60px] w-[60px] overflow-hidden rounded-xl bg-blue-50">
                    <img
                      src={item.gambar}
                      alt={item.nama}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <h3 className="mt-6 text-[20px] font-bold leading-tight text-[#0D1282]">
                    {item.nama}
                  </h3>

                  <p className="mt-4 text-[15px] font-medium leading-relaxed text-gray-600">
                    {item.deskripsiSingkat}
                  </p>

                  <button
                    onClick={() =>
                      setSelectedItem(
                        selectedItem?.id === item.id ? null : item,
                      )
                    }
                    className={`mt-8 rounded-lg px-6 py-2.5 text-[15px] font-bold transition-all ${
                      selectedItem?.id === item.id
                        ? "bg-gray-200 text-gray-700"
                        : "bg-[#0D1282] text-white hover:bg-[#0a0e66]"
                    }`}
                  >
                    {selectedItem?.id === item.id
                      ? "Tutup Detail"
                      : "Lihat Detail"}
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Detail Pelayanan */}
          {selectedItem && (
            <section className="mt-[80px] px-[30px]">
              <div className="mx-auto w-full max-w-[1365px] rounded-2xl bg-white p-8 shadow-lg lg:p-12">
                <div className="mb-8 flex items-center justify-between">
                  <h2 className="text-[32px] font-extrabold text-[#0D1282]">
                    Detail Pelayanan
                  </h2>

                  <button
                    onClick={() => setSelectedItem(null)}
                    className="rounded-full bg-gray-100 p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-500"
                  >
                    <span className="px-4 py-1 font-bold">✕ Tutup</span>
                  </button>
                </div>

                <div className="grid gap-12 lg:grid-cols-2">
                  <div className="h-[400px] overflow-hidden rounded-2xl bg-[#D9D9D9] shadow-inner">
                    <img
                      src={selectedItem.gambar}
                      alt={selectedItem.nama}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div>
                    <h3 className="text-[28px] font-bold text-[#D71313]">
                      {selectedItem.nama}
                    </h3>

                    <div className="mt-6 space-y-3 text-[18px] text-gray-700">
                      <p>
                        <span className="font-bold text-[#0D1282]">
                          Jadwal:
                        </span>{" "}
                        {selectedItem.jadwal}
                      </p>
                      <p>
                        <span className="font-bold text-[#0D1282]">
                          Penanggung Jawab:
                        </span>{" "}
                        {selectedItem.penanggungJawab}
                      </p>
                    </div>

                    <p className="mt-8 text-[18px] leading-[1.8] text-gray-600 italic">
                      {selectedItem.deskripsiLengkap}
                    </p>

                    <div className="mt-8">
                      <h4 className="text-[22px] font-bold text-[#0D1282]">
                        Syarat Bergabung
                      </h4>

                      <ul className="mt-4 space-y-2 text-[17px] leading-[1.8] text-gray-700">
                        {selectedItem.syarat.map((syarat, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-[#D71313]">✔</span> {syarat}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <a
                      href={getDetailWhatsappLink(selectedItem)}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-10 inline-block rounded-xl bg-[#25D366] px-10 py-4 text-[18px] font-bold text-white transition hover:scale-105"
                    >
                      Hubungi Admin
                    </a>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* CTA */}
          <section className="mt-[120px] px-[30px]">
            <div className="mx-auto flex w-full max-w-[1365px] flex-col items-center rounded-3xl bg-[#0D1282] py-20 text-center text-white shadow-xl">
              <h2 className="text-[40px] font-extrabold leading-tight md:text-[54px]">
                Terlibat dalam Pelayanan
              </h2>

              <p className="mt-8 max-w-[800px] px-6 text-[18px] font-medium text-blue-100 md:text-[22px]">
                Bergabunglah bersama kami untuk melayani Tuhan dan sesama
                melalui berbagai pelayanan yang tersedia.
              </p>

              <a
                href={daftarPelayananLink}
                target="_blank"
                rel="noreferrer"
                className="mt-12 rounded-full bg-[#D71313] px-12 py-4 text-[18px] font-bold text-white transition hover:scale-105 hover:bg-[#b51010]"
              >
                Daftar Pelayanan
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
