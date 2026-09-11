import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, MessageCircle, X } from "lucide-react";
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
      className="min-h-screen bg-[#f7f8fb] text-slate-900"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <main className="pb-20">
        <div className="mx-auto w-full max-w-7xl">
          {/* Judul */}
          <section className="px-5 pb-4 pt-16 text-center sm:px-8 lg:px-12">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D71313]">
              Bertumbuh dan melayani
            </p>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[#0D1282] sm:text-6xl">
              {hero.judul}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              {hero.subjudul}
            </p>
          </section>

          {/* Banner */}
          <section className="mt-10 px-5 sm:px-8 lg:px-12">
            <div className="relative mx-auto h-52 w-full overflow-hidden rounded-2xl shadow-lg sm:h-64">
              <img
                src={hero.gambarUtama}
                alt="Banner Pelayanan"
                className="h-full w-full object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#07104f]/80 via-[#07104f]/40 to-transparent" />
              {/* Label di atas gambar */}
              <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-12">
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-200">
                  GPdI Jemaat Sibulele
                </span>
                <p className="mt-2 max-w-xs text-lg font-extrabold leading-snug text-white sm:text-xl">
                  Bertumbuh &amp; Melayani Bersama
                </p>
                <p className="mt-1 text-xs text-blue-100/80">
                  Temukan pelayanan yang sesuai dengan panggilanmu
                </p>
              </div>
            </div>
          </section>

          {/* Grid Pelayanan */}
          <section className="mt-20 px-5 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-950/10"
                >
                  {/* Gambar banner atas */}
                  <div className="relative h-44 w-full overflow-hidden bg-blue-100">
                    <img
                      src={item.gambar}
                      alt={item.nama}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>

                  {/* Konten bawah */}
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-base font-bold leading-snug text-[#0D1282]">
                      {item.nama}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-500 flex-1">
                      {item.deskripsiSingkat}
                    </p>
                    <button
                      onClick={() =>
                        setSelectedItem(
                          selectedItem?.id === item.id ? null : item,
                        )
                      }
                      className={`mt-5 flex w-fit items-center gap-2 rounded-full px-5 py-2 text-xs font-bold transition-all ${
                        selectedItem?.id === item.id
                          ? "bg-slate-100 text-slate-700"
                          : "bg-[#0D1282] text-white hover:bg-[#0a0e66]"
                      }`}
                    >
                      {selectedItem?.id === item.id ? (
                        <><X size={13} /> Tutup detail</>
                      ) : (
                        <><ArrowRight size={13} /> Lihat detail</>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Detail Pelayanan */}
          {selectedItem && (
            <section className="mt-[80px] px-[30px]">
              <div className="mx-5 w-auto max-w-none rounded-2xl border border-slate-200 bg-white p-6 shadow-lg sm:mx-8 sm:p-10 lg:mx-12">
                <div className="mb-8 flex items-center justify-between">
                  <h2 className="text-[32px] font-extrabold text-[#0D1282]">
                    Detail Pelayanan
                  </h2>

                  <button
                    onClick={() => setSelectedItem(null)}
                    className="rounded-full bg-red-50 p-2 text-[#D71313] transition hover:bg-red-100"
                  >
                    <span className="flex items-center gap-2 px-3 py-1 font-bold">
                      <X size={15} /> Tutup
                    </span>
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

                    <div className="mt-6">
                      <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-sm font-bold text-[#0D1282]">
                        🗓 {selectedItem.jadwal}
                      </span>
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
                            <CheckCircle2
                              size={18}
                              className="mt-1 shrink-0 text-[#D71313]"
                            />{" "}
                            {syarat}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <a
                      href={getDetailWhatsappLink(selectedItem)}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-3 text-sm font-bold text-white transition hover:bg-[#1eae54]"
                    >
                      <MessageCircle size={17} /> Hubungi admin
                    </a>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* CTA */}
          <section className="mt-16 px-5 sm:px-8 lg:px-12">
            <div className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-[#0D1282] px-8 py-8 text-white shadow-lg sm:flex-row sm:items-center sm:px-10">
              <div>
                <h2 className="text-lg font-extrabold leading-snug sm:text-xl">
                  Terlibat dalam Pelayanan
                </h2>
                <p className="mt-1.5 max-w-lg text-sm text-blue-200/90">
                  Bergabunglah bersama kami untuk melayani Tuhan dan sesama melalui berbagai pelayanan yang tersedia.
                </p>
              </div>
              <a
                href={daftarPelayananLink}
                target="_blank"
                rel="noreferrer"
                className="flex shrink-0 items-center gap-2 rounded-full bg-[#D71313] px-6 py-2.5 text-sm font-bold text-white transition hover:bg-[#b51010]"
              >
                Daftar pelayanan <ArrowRight size={15} />
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
