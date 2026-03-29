import React, { useState } from "react";

const pengakuanIman = [
  'Kami percaya Alkitab adalah Firman Allah yang diilhamkan oleh Roh Kudus terdiri dari 66 buku: "Kejadian sampai dengan Wahyu" (2 Tim. 3:16; 2 Pet. 1:21).',
  'Kami percaya Allah Yang Maha Esa dan kekal dalam wujud Trinitas: "BAPA dan PUTERA dan ROH KUDUS", (Ul. 6:4; 1 Tim. 2:5; 1 Yoh. 5:7; Mat. 28:19). Keesaan nama-Nya yaitu: "TUHAN YESUS – KRISTUS", (Kis. 2:36; 8:12; 10:48; Mat. 1:1; Why. 22:20-21; Kis. 19:5; 1 Pet. 3:15).',
  'Kami percaya Allah pencipta alam semesta dan manusia, seperti tertulis dalam Kitab Kejadian (Kej. 1 dan 2; Yoh. 1:1-3; Kol. 1:16; Rm. 4:17; 1:19-20).',
  'Kami percaya Tuhan Yesus Kristus, Anak Allah yang telah menjadi manusia, dilahirkan Perawan Maria yang mengandung oleh Roh Kudus, mati disalib menanggung dosa manusia, dikuburkan, bangkit, naik ke sorga dan akan datang kembali (Yoh. 20:31; Rm. 1:4; 1 Yoh. 4:15; Yoh. 1:14; Flp. 2:7-8; 1 Tim. 3:16; Mat. 1:18; Yes. 7:14; Luk. 1:35; 1 Tim. 1:15; Kis. 4:11-12; 10:42-43; Rm. 6:4; 1 Kor. 15:3-4; 1 Tes. 4:15, 17).',
  'Kami percaya Roh Kudus adalah Pribadi Allah yang memiliki sifat: Kekal, Mahahadir, Mahakuasa, Mahatahu, Mahakudus, Mahakasih, dan baptisan Roh Kudus yaitu kepenuhan Roh Kudus dengan tanda berkata-kata dalam berbagai bahasa sebagaimana dianugerahkan oleh Roh Kudus diterima oleh orang percaya, bertobat dan lahir baru (1 Yoh. 5:7; 2 Kor. 13:13; Ibr. 9:14; Mzm. 139:7-10; Luk. 1:35; Kej. 1:2; Ayb. 26:13; Kis. 2:4; 10:45-46; 19:6; Mrk. 16:17; Yoh. 7:38-39).',
  'Kami percaya baptisan air, yaitu diselamkan dalam nama Bapa dan Putera dan Roh Kudus, yaitu Tuhan Yesus Kristus wajib dilakukan bagi mereka yang diselamatkan yaitu percaya, bertobat dan lahir baru, untuk menggenapkan kebenaran Allah. (Mrk. 16:15-16; Kis. 2:38; 8:12,37 dan 39; Mat. 3:15; 28:19; Mrk. 1:15).',
  'Kami percaya keselamatan orang berdosa, roh, jiwa dan tubuh, oleh anugerah dan iman kepada Tuhan Yesus Kristus, dan semua orang percaya harus mempertahankan keselamatan, kekudusan, kesetiaan dan apabila tidak memeliharanya, keselamatan itu dapat hilang. (Ef. 2:8-9; Rm. 10:9-10; 1 Kor. 1:18; Flp. 2:12; Mat. 24:13; Ibr. 3:12; 2 Pet. 2:20-22; 1:4-11; Yud. 1:3).',
  'Kami percaya peranan karunia-karunia Roh Kudus dalam jemaat. (1 Kor. 12:4-11; 14:26).',
  'Kami percaya Perjamuan Tuhan yang lazim disebut Perjamuan Kudus harus diterima oleh mereka yang percaya. (Luk. 22:19-20; 1 Kor. 11:23-26; Yoh. 6:53-56).',
  'Kami percaya kesembuhan Allah atas segala penyakit oleh bilur-bilur Yesus dalam kuasa nama-Nya. (Yes. 53:4; 1 Pet. 2:24; Kis. 4:30; Mrk. 16:18).',
  'Kami percaya penyerahan anak-anak adalah kehendak Tuhan. (Luk. 2:22-27; Mat. 19:13-15; Mrk. 10:13-16; Luk. 18:15-17).',
  'Kami percaya Gereja Tuhan yang esa, persekutuan orang-orang percaya, kudus dan sempurna sebagai Mempelai Perempuan, disingkirkan selama masa tiga setengah tahun tribulasi, diubahkan dan diangkat pada kedatangan kembali Tuhan Yesus. (Yoh. 17:21-23; Ef. 4:12-16; 1 Tes. 5:23; 1 Pet. 5:10; 1 Tes. 5:4; 1 Kor. 15:51).',
  'Kami percaya Tuhan Yesus Kristus sebagai Mempelai Laki-laki, Raja atas segala raja dan Tuan atas segala tuan, yang akan datang untuk menghukum isi dunia dengan adil, dan akan memerintah dalam Kerajaan Seribu Tahun Damai bersama Mempelai Perempuan yaitu Gereja-Nya. (Kis. 1:11; Why. 22:7; 1 Kor. 15:24-25; 1 Tes. 4:16-17; 2 Tes. 1:7,9; Why. 20:10-15; Why. 19:11-16; 1 Tim. 6:15).',
  'Kami percaya kebangkitan orang-orang kudus sebelum Kerajaan Seribu Tahun Damai dan kebangkitan orang-orang berdosa sesudah Kerajaan itu; orang kudus akan menerima hidup kekal, orang berdosa akan menghadap takhta Allah untuk menerima penghukuman kekal dalam lautan api (Why. 20:1-15; 1 Tes. 4:16-17).',
  'Kami percaya langit dan bumi baru yang berisi Kebenaran, tempat kediaman kekal umat tebusan darah Kristus (1 Pet. 1:18-19; 2 Pet. 3:13; Why. 21:1-18).',
  'Kami percaya pertemuan-pertemuan ibadah, wajib dilaksanakan secara tetap dengan khidmat dan suci. (Kis. 2:25; Kel. 23:25; Ibr. 10:25; Mzm. 47:2; 100:1-5; 134:2; 150:1-5).',
  'Kami percaya setiap pemerintah adalah hamba Allah yang ditetapkan Allah. (Rm. 13:4; 1 Pet. 2:17; 1 Tim. 2:1-2; Ams. 21:1).',
];

const strukturPelayanan = [
  "Gembala/Pendeta",
  "Wakil/Majelis",
  "Koordinator Pelayanan",
  "Pelayan",
];

export default function ProfilGerejaPage() {
  const [showFull, setShowFull] = useState(false);

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
                {(showFull ? pengakuanIman : pengakuanIman.slice(0, 4)).map((item, index) => (
                  <li key={index} className="list-decimal">
                    <span>{item}</span>
                  </li>
                ))}
              </ol>

              <button
                onClick={() => setShowFull(!showFull)}
                className="mt-[42px] rounded-[18px] bg-[#D71313] px-[34px] py-[12px] text-[18px] font-normal text-black"
              >
                {showFull ? "Sembunyikan" : "Baca Selengkapnya"}
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