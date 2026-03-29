const pengakuanIman = [
  'Kami percaya Alkitab adalah Firman Allah yang diilhamkan oleh Roh Kudus terdiri dari 66 buku: "Kejadian sampai dengan Wahyu" (2 Tim. 3:16; 2 Ptr. 1:21).',
  'Kami percaya Allah Yang Maha Esa dan kekal dalam wujud Trinitas: "BAPA dan PUTERA dan ROH KUDUS", (Ul. 6:4; 1 Tim. 2:5; 1 Yoh. 5:7; Mat. 28:19). Keesaan namaNya yaitu: "TUHAN YESUS – KRISTUS", (Kis. 2:3; 8:12; 10:48; Mat. 1:1; Why. 22:20-21; Kis. 19:5; 1 Ptr. 3:15)',
  "Kami percaya Allah pencipta alam semesta dan manusia, seperti tertulis dalam Kitab Kejadian (Kej. 1 dan 2; Yoh. 1:1-3; Kol. 1:16; Rm. 4:17; 1:19-20).",
  "Kami percaya Tuhan Yesus Kristus, Anak Allah yang telah menjadi manusia, dilahirkan Perawan Maria yang mengandung oleh Roh Kudus, mati disalib menanggung dosa manusia, dikuburkan, bangkit, naik ke sorga dan akan datang kembali (Yoh. 20:31; Rm. 1:4; 1 Yoh. 4:15; Yoh. 1:14; Flp. 2:7- 8; 1 Tim. 3:16; Mat. 1:18; Yes. 7:14; Luk. 1:35; 1 Tim. 1:15; Kis. 4:1-12; 10:42-43; Rm. 6:4; 1 Kor. 15:3- 4; 1 Tes. 4:15, 17).",
];

const strukturPelayanan = [
  "Gembala/Pendeta",
  "Wakil/Majelis",
  "Koordinator Pelayanan",
  "Pelayan",
];

export default function ProfilGerejaPage() {
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
            <div className="mx-auto flex h-[372px] w-full max-w-[1365px] items-center justify-center bg-[#D9D9D9]">
              <span className="text-[18px] font-normal text-black">
                Placeholder (Foto Gedung)
              </span>
            </div>
          </section>

          {/* Sejarah */}
          <section className="mt-[115px] px-[40px]">
            <div className="mx-auto grid w-full max-w-[1300px] grid-cols-1 items-start gap-x-[90px] gap-y-[40px] lg:grid-cols-[450px_1fr]">
              <div className="flex justify-center lg:justify-start">
                <div className="flex h-[420px] w-[430px] items-center justify-center bg-[#D9D9D9] text-center text-[16px] text-black">
                  placeholder foto gedung lama
                </div>
              </div>

              <div className="max-w-[690px]">
                <h2 className="text-[22px] font-medium text-black">
                  Sejarah GPDI Jemaat Sibulele
                </h2>

                <div className="mt-[14px] space-y-[8px] text-[16px] leading-[1.45] text-black">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipiscing elit.
                    Quisque faucibus ex sapien vitae pellentesque sem placerat.
                    In id cursus mi pretium tellus duis convallis. Tempus leo eu
                    aenean sed diam urna tempor. Pulvinar vivamus fringilla
                    lacus nec metus bibendum egestas. Iaculis massa nisl
                    malesuada lacinia integer nunc posuere. Ut hendrerit semper
                    vel class aptent taciti sociosqu. Ad litora torquent per
                    conubia nostra inceptos himenaeos.
                  </p>

                  <p>
                    Lorem ipsum dolor sit amet consectetur adipiscing elit.
                    Quisque faucibus ex sapien vitae pellentesque sem placerat.
                    In id cursus mi pretium tellus duis convallis. Tempus leo eu
                    aenean sed diam urna tempor. Pulvinar vivamus fringilla
                    lacus nec metus bibendum egestas. Iaculis massa nisl
                    malesuada lacinia integer nunc posuere. Ut hendrerit semper
                    vel class aptent taciti sociosqu. Ad litora torquent per
                    conubia nostra inceptos himenaeos.
                  </p>
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
                  Menjadi gereja yang bertumbuh dalam kasih, iman, dan
                  pengharapan, serta menjadi berkat bagi komunitas sekitar.
                </p>
              </div>

              <div className="mx-auto flex h-[215px] w-full max-w-[540px] flex-col items-center bg-[#EEEDED] px-[28px] pt-[48px] text-center">
                <h3 className="text-[20px] font-medium text-black">MISI</h3>

                <ul className="mt-[18px] w-full max-w-[430px] list-disc pl-5 text-left text-[16px] leading-[1.35] text-black">
                  <li>Mengajarkan Firman Tuhan secara relevan.</li>
                  <li>Membangun persekutuan yang erat antar jemaat.</li>
                  <li>Melayani masyarakat dengan kasih Kristus.</li>
                  <li>Mendorong pertumbuhan rohani setiap anggota.</li>
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
                {pengakuanIman.map((item, index) => (
                  <li key={index} className="list-decimal">
                    <span>{item}</span>
                  </li>
                ))}
              </ol>

              <button className="mt-[42px] rounded-[18px] bg-[#D71313] px-[34px] py-[12px] text-[18px] font-normal text-black">
                Baca Selengkapnya
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
