import { useState } from "react";
import { homeData } from "../../data/homeData";

export default function HomePage() {
  const { gereja, hero, jadwalIbadah, jadwalDetail, pengumuman, renungan } =
    homeData;

  const [activeDetail, setActiveDetail] = useState(null);

  return (
    <div
      className="min-h-screen bg-[#FFFFFF] text-[#0D1282]"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <main className="bg-[#EEEDED] px-5 py-10 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-10">
          {/* Hero */}
          <section className="rounded-lg bg-white px-6 py-10 text-center shadow-sm lg:px-10 lg:py-14">
            <h1 className="text-3xl font-extrabold tracking-wide text-[#0D1282] lg:text-5xl">
              {hero.judul}
            </h1>
            <p className="mt-4 text-lg font-semibold text-[#D71313] lg:text-2xl">
              {hero.referensi}
            </p>
            <p className="mx-auto mt-6 max-w-4xl text-base leading-relaxed text-gray-700 lg:text-lg">
              {hero.isi}
            </p>
          </section>

          {/* Cards */}
          <section className="grid gap-6 lg:grid-cols-3">
            {/* Jadwal Ibadah */}
            <div className="flex min-h-[300px] flex-col justify-between rounded-lg bg-[#0D1282] px-6 py-8 text-white shadow-md">
              <div>
                <h2 className="text-2xl font-bold lg:text-3xl">
                  Jadwal Ibadah
                </h2>
                <div className="mt-6 space-y-4">
                  {jadwalIbadah.map((item, index) => (
                    <div key={index}>
                      <p className="text-lg font-semibold">{item.nama}</p>
                      <p className="text-sm text-[#EEEDED]">{item.waktu}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() =>
                    setActiveDetail(activeDetail === "jadwal" ? null : "jadwal")
                  }
                  className="rounded-md bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-[#EEEDED]"
                >
                  {activeDetail === "jadwal" ? "Tutup" : "Detail"}
                </button>
              </div>
            </div>

            {/* Pengumuman */}
            <div className="flex min-h-[300px] flex-col justify-between rounded-lg bg-[#0D1282] px-6 py-8 text-white shadow-md">
              <div>
                <h2 className="text-2xl font-bold lg:text-3xl">
                  Pengumuman Terbaru
                </h2>
                <div className="mt-6 space-y-4">
                  {pengumuman.slice(0, 3).map((item) => (
                    <div key={item.id}>
                      <p className="text-base font-semibold">{item.judul}</p>
                      <p className="text-sm text-[#EEEDED]">{item.tanggal}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() =>
                    setActiveDetail(
                      activeDetail === "pengumuman" ? null : "pengumuman",
                    )
                  }
                  className="rounded-md bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-[#EEEDED]"
                >
                  {activeDetail === "pengumuman" ? "Tutup" : "Selengkapnya"}
                </button>
              </div>
            </div>

            {/* Renungan */}
            <div className="flex min-h-[300px] flex-col justify-between rounded-lg bg-[#0D1282] px-6 py-8 text-white shadow-md">
              <div>
                <h2 className="text-2xl font-bold lg:text-3xl">
                  Renungan Hari Ini
                </h2>
                <p className="mt-4 text-base font-semibold text-[#EEEDED]">
                  {renungan.judul}
                </p>
                <p className="mt-4 text-sm leading-relaxed lg:text-base">
                  {renungan.ringkas}
                </p>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() =>
                    setActiveDetail(
                      activeDetail === "renungan" ? null : "renungan",
                    )
                  }
                  className="rounded-md bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-[#EEEDED]"
                >
                  {activeDetail === "renungan" ? "Tutup" : "Baca Renungan"}
                </button>
              </div>
            </div>
          </section>

          {/* Detail Dinamis */}
          {activeDetail && (
            <section className="rounded-lg bg-white px-6 py-8 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-3xl font-extrabold text-[#0D1282]">
                  {activeDetail === "jadwal" && "Detail Jadwal Ibadah"}
                  {activeDetail === "pengumuman" && "Semua Pengumuman"}
                  {activeDetail === "renungan" && "Renungan Hari Ini"}
                </h2>

                <button
                  onClick={() => setActiveDetail(null)}
                  className="rounded-md bg-[#D71313] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  Tutup
                </button>
              </div>

              {activeDetail === "jadwal" && (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {jadwalDetail.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-xl border border-[#EEEDED] bg-[#F9F9F9] p-5 shadow-sm"
                    >
                      <h3 className="text-xl font-bold text-[#0D1282]">
                        {item.nama}
                      </h3>

                      <div className="mt-4 space-y-2 text-sm text-gray-700">
                        <p>
                          <span className="font-semibold text-[#0D1282]">
                            Hari:
                          </span>{" "}
                          {item.hari}
                        </p>
                        <p>
                          <span className="font-semibold text-[#0D1282]">
                            Jam:
                          </span>{" "}
                          {item.jam}
                        </p>
                        <p>
                          <span className="font-semibold text-[#0D1282]">
                            Tempat:
                          </span>{" "}
                          {item.tempat}
                        </p>
                        <p>
                          <span className="font-semibold text-[#0D1282]">
                            Pelayan:
                          </span>{" "}
                          {item.pelayan}
                        </p>
                      </div>

                      <p className="mt-4 text-sm leading-relaxed text-gray-600">
                        {item.keterangan}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {activeDetail === "pengumuman" && (
                <div className="space-y-4">
                  {pengumuman.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-lg border border-[#EEEDED] bg-[#F9F9F9] p-5 shadow-sm"
                    >
                      <h3 className="text-xl font-bold text-[#0D1282]">
                        {item.judul}
                      </h3>
                      <p className="mt-2 text-sm font-medium text-[#D71313]">
                        {item.tanggal}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-gray-700">
                        {item.isi}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {activeDetail === "renungan" && (
                <div className="max-w-4xl rounded-lg border border-[#EEEDED] bg-[#F9F9F9] p-6 shadow-sm">
                  <h3 className="text-2xl font-bold text-[#0D1282]">
                    {renungan.judul}
                  </h3>
                  <p className="mt-2 text-sm font-medium text-[#D71313]">
                    {renungan.ayat}
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-gray-700">
                    {renungan.isi}
                  </p>
                </div>
              )}
            </section>
          )}

          {/* Lokasi */}
          <section className="space-y-6 rounded-lg bg-white px-6 py-8 shadow-sm">
            <h2 className="text-3xl font-extrabold text-[#0D1282] lg:text-4xl">
              Lokasi Gereja
            </h2>

            <div className="h-[350px] w-full overflow-hidden rounded-lg border border-gray-200 shadow-sm">
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

            <div className="space-y-3 text-base font-medium leading-relaxed text-gray-700 lg:text-lg">
              <p>{gereja.alamat}</p>
              <p>Telepon : {gereja.telepon}</p>
              <p>Email : {gereja.email}</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
