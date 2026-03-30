export default function ProfilPage() {
  const inputClass =
    "w-full border border-[#7A7A7A] bg-white px-4 py-3 text-[14px] text-[#1F1F1F] outline-none";

  const sectionClass = "bg-[#EEEDED] px-8 py-12";
  const labelClass = "mb-2 block text-[13px] font-medium text-[#222222]";

  return (
    <div
      className="min-h-screen bg-[#FFFFFF] text-[#111111]"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <main className="px-6 pt-6 pb-24">
        <div className="mx-auto max-w-[1760px]">
          <section>
            <h1
              className="text-[58px] font-bold leading-none text-black"
              style={{ fontFamily: "monospace" }}
            >
              Profil Saya
            </h1>
            <p className="mt-3 text-[18px] text-[#2A2A2A]">
              Kelola Informasi pribadi dan data anggota keluarga
            </p>
          </section>

          <section className={`mt-8 ${sectionClass}`}>
            <h2 className="mb-8 text-[20px] font-bold text-[#111111]">
              Data Pribadi
            </h2>

            <div className="space-y-5">
              <div>
                <label className={labelClass}>Nama Lengkap</label>
                <input
                  className={inputClass}
                  defaultValue="Nama Lengkap Jemaat"
                />
              </div>

              <div>
                <label className={labelClass}>Nomor HP</label>
                <input className={inputClass} defaultValue="08123456789" />
              </div>

              <div>
                <label className={labelClass}>Pekerjaan</label>
                <input className={inputClass} defaultValue="Pekerjaan Jemaat" />
              </div>

              <div>
                <label className={labelClass}>Email</label>
                <input
                  className={inputClass}
                  defaultValue="email@example.com"
                />
              </div>

              <div>
                <label className={labelClass}>Rayon</label>
                <input className={inputClass} defaultValue="Rayon A" />
              </div>
            </div>
          </section>

          <section className={`mt-12 ${sectionClass}`}>
            <div className="mb-10 flex items-center justify-between">
              <h2 className="text-[20px] font-bold text-[#111111]">
                Anggota Keluarga
              </h2>

              <button className="bg-[#0D1282] px-4 py-2 text-[13px] font-semibold text-white">
                + Tambah Anggota Keluarga
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-[12px] text-[#222222]">
                <thead>
                  <tr className="bg-white">
                    <th className="border border-[#D0D0D0] px-3 py-2 font-semibold">
                      Nama
                    </th>
                    <th className="border border-[#D0D0D0] px-3 py-2 font-semibold">
                      Jenis Kelamin
                    </th>
                    <th className="border border-[#D0D0D0] px-3 py-2 font-semibold">
                      Tanggal Lahir
                    </th>
                    <th className="border border-[#D0D0D0] px-3 py-2 font-semibold">
                      Hubungan
                    </th>
                    <th className="border border-[#D0D0D0] px-3 py-2 font-semibold">
                      Status Baptis
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-[#FAFAFA]">
                    <td className="border border-[#D0D0D0] px-3 py-2">
                      Anggota 1
                    </td>
                    <td className="border border-[#D0D0D0] px-3 py-2">
                      Laki-laki
                    </td>
                    <td className="border border-[#D0D0D0] px-3 py-2">
                      1990-01-01
                    </td>
                    <td className="border border-[#D0D0D0] px-3 py-2">Istri</td>
                    <td className="border border-[#D0D0D0] px-3 py-2">Sudah</td>
                  </tr>
                  <tr className="bg-[#FAFAFA]">
                    <td className="border border-[#D0D0D0] px-3 py-2">
                      Anggota 2
                    </td>
                    <td className="border border-[#D0D0D0] px-3 py-2">
                      Perempuan
                    </td>
                    <td className="border border-[#D0D0D0] px-3 py-2">
                      2015-05-10
                    </td>
                    <td className="border border-[#D0D0D0] px-3 py-2">Anak</td>
                    <td className="border border-[#D0D0D0] px-3 py-2">Belum</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mt-24 text-[14px] text-[#333333]">
              Data anggota keluarga akan digunakan untuk administrasi pelayanan
              dan surat gereja.
            </p>
          </section>

          <section className={`mt-12 ${sectionClass} min-h-[520px]`}>
            <h2 className="mb-8 text-[20px] font-bold text-[#111111]">
              Keamanan Akun
            </h2>

            <div className="space-y-5">
              <div>
                <label className={labelClass}>Password Lama</label>
                <input type="password" className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>Password Baru</label>
                <input type="password" className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>Konfirmasi Password Baru</label>
                <input type="password" className={inputClass} />
              </div>
            </div>

            <p className="mt-5 text-[13px] text-[#333333]">
              Password minimal 8 karakter dan kombinasi huruf serta angka
            </p>

            <button className="mt-8 w-full border border-[#0B5FB3] bg-[#0D1282] py-3 text-[14px] font-semibold text-white">
              Perbarui Password
            </button>
          </section>
        </div>
      </main>
    </div>
  );
}
