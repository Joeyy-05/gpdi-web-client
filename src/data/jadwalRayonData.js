export const rayonInfo = {
  namaRayon: "Nama Rayon Jemaat",
  ketuaRayon: "Nama Ketua Rayon",
  wilayah: "Wilayah Rayon",
  catatan: "Informasi jadwal diperbarui secara real-time oleh Ketua Rayon.",
};

export const jadwalAktif = {
  tanggalIbadah: "Tanggal ibadah",
  waktu: "Waktu ibadah",
  lokasi: "Lokasi ibadah",
  pelayanFirman: "Nama Pelayan Firman",
  penanggungJawab: "Nama Penanggung Jawab",
  status: "Aktif",
};

export const riwayatJadwal = [
  {
    id: 1,
    tanggal: "xx/xx/xxxx",
    lokasi: "Lokasi X",
    pelayanFirman: "Nama Pelayan Y",
    status: "Selesai",
  },
  {
    id: 2,
    tanggal: "xx/xx/xxxx",
    lokasi: "Lokasi Z",
    pelayanFirman: "Nama Pelayan A",
    status: "Dibatalkan",
  },
];

export const notifikasiJadwal = [
  {
    id: 1,
    pesan: "Jadwal Ibadah Rayon tanggal xx/xx/xxxx telah diperbarui.",
    deskripsi: "Perubahan dilakukan karena adanya penyesuaian jadwal dengan kegiatan pusat. Ibadah yang semula direncanakan pukul 18.00 diundur menjadi pukul 19.00 di lokasi yang sama.",
  },
  {
    id: 2,
    pesan: "Jadwal Ibadah Rayon minggu ini dibatalkan.",
    deskripsi: "Ibadah dibatalkan dikarenakan adanya kedukaan di keluarga tuan rumah. Jemaat diminta untuk bergabung dengan ibadah gabungan di gereja utama.",
  },
  {
    id: 3,
    pesan: "Notifikasi dikirim otomatis ketika Ketua Rayon melakukan perubahan jadwal.",
    deskripsi: null, // Tanpa tombol detail
  },
];