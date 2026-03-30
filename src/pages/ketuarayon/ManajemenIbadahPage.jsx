import {
  jadwalDummy,
  historyDummy,
  previewNotification,
} from "../../data/manajemenIbadahData";

export default function ManajemenIbadahPage() {
  const inputClass =
    "w-full h-[64px] border border-[#D1D1D1] bg-white px-6 text-[18px] font-medium text-[#0D1282] placeholder:text-[#7A7A7A] outline-none";
  const labelClass = "mb-3 block text-[20px] font-semibold text-[#0D1282]";

  return (
    <div
      className="min-h-screen bg-white text-[#0D1282]"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <main className="px-6 pb-10 pt-10 bg-white">
        <div className="mx-auto max-w-[1760px]">
          <section className="rounded-[24px] bg-[#0D1282] p-10 text-white shadow-sm">
            <h1 className="font-sans text-[48px] font-bold leading-tight">
              Manajemen Ibadah Rayon
            </h1>
            <p className="mt-6 text-[20px] font-medium text-[#EEEDED]">
              Kelola jadwal ibadah rayon secara terpusat dan terorganisir
            </p>
            <p className="mt-2 text-[20px] font-medium text-[#EEEDED]">
              Tanggal: Tanggal Otomatis
            </p>

            <div className="mt-8 flex justify-end">
              <button
                type="button"
                className="rounded-[12px] bg-[#D71313] px-6 py-3 text-[22px] font-semibold text-white shadow-lg transition hover:bg-[#b10f10]"
              >
                Tambah Jadwal Ibadah
              </button>
            </div>
          </section>

          <section className="mt-10 rounded-[24px] bg-[#EEEDED] p-8">
            <h2 className="mb-8 text-[24px] font-semibold text-[#0D1282]">
              Form Tambah / Edit Jadwal Ibadah
            </h2>

            <form className="space-y-7">
              <div>
                <label className={labelClass}>Nama Rayon</label>
                <input
                  className={inputClass}
                  defaultValue="Nama Rayon Otomatis"
                />
              </div>

              <div>
                <label className={labelClass}>Tanggal Ibadah</label>
                <input className={inputClass} placeholder="dd/mm/yyyy" />
              </div>

              <div>
                <label className={labelClass}>Waktu Ibadah</label>
                <input className={inputClass} placeholder="hh:mm" />
              </div>

              <div>
                <label className={labelClass}>Lokasi Ibadah</label>
                <input
                  className={inputClass}
                  placeholder="Masukkan Lokasi Ibadah"
                />
              </div>

              <div>
                <label className={labelClass}>Pelayan Firman</label>
                <input
                  className={inputClass}
                  placeholder="Masukkan Nama Pelayan Firman"
                />
              </div>

              <div>
                <label className={labelClass}>Penanggung Jawab</label>
                <input
                  className={inputClass}
                  placeholder="Masukkan Nama Penanggung Jawab"
                />
              </div>

              <div>
                <label className={labelClass}>
                  Keterangan Tambahan (Opsional)
                </label>
                <textarea
                  className="min-h-[190px] w-full border border-[#D1D1D1] bg-white px-6 py-6 text-[18px] font-medium text-[#0D1282] placeholder:text-[#7A7A7A] outline-none"
                  placeholder="Tambahkan Keterangan Tambahan"
                />
              </div>

              <div>
                <span className={labelClass}>Status</span>
                <div className="flex items-center gap-14 pl-1 text-[18px] font-medium text-[#0D1282]">
                  <label className="flex items-center gap-4">
                    <input
                      type="radio"
                      name="status"
                      className="h-[19px] w-[19px] accent-[#0D1282]"
                    />
                    <span>Aktif</span>
                  </label>

                  <label className="flex items-center gap-4">
                    <input
                      type="radio"
                      name="status"
                      className="h-[19px] w-[19px] accent-[#0D1282]"
                    />
                    <span>Dibatalkan</span>
                  </label>
                </div>
              </div>

              <div className="pt-1">
                <label className="flex items-center gap-4 text-[18px] font-medium text-[#0D1282]">
                  <input
                    type="checkbox"
                    className="h-[19px] w-[19px] accent-[#0D1282]"
                  />
                  <span>Kirim notifikasi ke seluruh Kepala Keluarga rayon</span>
                </label>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <button
                  type="submit"
                  className="min-w-[172px] rounded-[12px] bg-[#D71313] px-8 py-3 text-[20px] font-semibold text-white shadow-sm transition hover:bg-[#b10f10]"
                >
                  Simpan
                </button>
                <button
                  type="button"
                  className="min-w-[172px] rounded-[12px] border border-[#D71313] bg-white px-8 py-3 text-[20px] font-semibold text-[#0D1282] transition hover:bg-[#F8F8F8]"
                >
                  Batal
                </button>
              </div>
            </form>

            <p className="mt-3 text-[18px] italic text-[#333333]">
              “Setiap perubahan jadwal akan tercatat dalam log aktivitas dan
              dapat dipantau oleh Pendeta.”
            </p>
          </section>

          <section className="mt-8 rounded-[24px] bg-[#EEEDED] p-8">
            <h3 className="mb-4 text-[22px] font-bold text-[#0D1282]">
              Daftar Jadwal Ibadah Rayon
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-[13px] text-[#0D1282]">
                <thead>
                  <tr className="bg-white">
                    <th className="border border-[#CFCFCF] px-3 py-3 font-semibold">
                      Tanggal
                    </th>
                    <th className="border border-[#CFCFCF] px-3 py-3 font-semibold">
                      Waktu
                    </th>
                    <th className="border border-[#CFCFCF] px-3 py-3 font-semibold">
                      Lokasi
                    </th>
                    <th className="border border-[#CFCFCF] px-3 py-3 font-semibold">
                      Pelayan Firman
                    </th>
                    <th className="border border-[#CFCFCF] px-3 py-3 font-semibold">
                      Status
                    </th>
                    <th className="border border-[#CFCFCF] px-3 py-3 font-semibold">
                      Terakhir Diperbarui
                    </th>
                    <th className="border border-[#CFCFCF] px-3 py-3 font-semibold">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {jadwalDummy.map((item) => (
                    <tr key={item.id} className="bg-[#F8F8F8]">
                      <td className="border border-[#CFCFCF] px-3 py-2">
                        {item.tanggal}
                      </td>
                      <td className="border border-[#CFCFCF] px-3 py-2">
                        {item.waktu}
                      </td>
                      <td className="border border-[#CFCFCF] px-3 py-2">
                        {item.lokasi}
                      </td>
                      <td className="border border-[#CFCFCF] px-3 py-2">
                        {item.pelayan}
                      </td>
                      <td className="border border-[#CFCFCF] px-3 py-2">
                        {item.status}
                      </td>
                      <td className="border border-[#CFCFCF] px-3 py-2">
                        {item.updatedAt}
                      </td>
                      <td className="border border-[#CFCFCF] px-3 py-2">
                        Edit | Batalkan | Lihat Histori
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mt-10 rounded-[24px] bg-[#EEEDED] p-8">
            <h3 className="mb-4 text-[22px] font-bold text-[#0D1282]">
              Histori Perubahan Jadwal
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-[13px] text-[#0D1282]">
                <thead>
                  <tr className="bg-white">
                    <th className="border border-[#CFCFCF] px-3 py-3 font-semibold">
                      Tanggal Perubahan
                    </th>
                    <th className="border border-[#CFCFCF] px-3 py-3 font-semibold">
                      Perubahan Apa
                    </th>
                    <th className="border border-[#CFCFCF] px-3 py-3 font-semibold">
                      Dilakukan Oleh
                    </th>
                    <th className="border border-[#CFCFCF] px-3 py-3 font-semibold">
                      Keterangan
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {historyDummy.map((item) => (
                    <tr key={item.id} className="bg-[#F8F8F8]">
                      <td className="border border-[#CFCFCF] px-3 py-2">
                        {item.tanggal}
                      </td>
                      <td className="border border-[#CFCFCF] px-3 py-2">
                        {item.perubahan}
                      </td>
                      <td className="border border-[#CFCFCF] px-3 py-2">
                        {item.oleh}
                      </td>
                      <td className="border border-[#CFCFCF] px-3 py-2">
                        {item.keterangan}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-3 text-[18px] italic text-[#333333]">
              “Riwayat perubahan tersimpan otomatis untuk menjaga transparansi
              pelayanan.”
            </p>
          </section>

          <section className="mt-8 border border-[#8F8F8F] bg-[#F5F5F5] px-4 py-5">
            <h3 className="mb-4 text-[18px] font-medium text-[#222222]">
              Preview Notifikasi
            </h3>
            <p className="text-[18px] text-[#222222]">{previewNotification}</p>
          </section>
        </div>
      </main>
    </div>
  );
}
