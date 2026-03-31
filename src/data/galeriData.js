const createDummyImage = (title, color = "0D1282", size = "600x400") => {
  return `https://placehold.co/${size}/${color}/FFFFFF?text=${encodeURIComponent(title)}`;
};

export const galeriData = {
  hero: {
    ayat: "Segala sesuatu yang kamu lakukan dengan perkataan atau perbuatan, lakukanlah semuanya itu dalam nama Tuhan Yesus.",
    referensi: "Kolose 3:17",
    gambarBanner: createDummyImage(
      "Galeri Kegiatan GPdI Sibulele",
      "D9D9D9",
      "1365x380",
    ),
  },
  items: [
    {
      id: 1,
      judul: "Ibadah Raya Minggu",
      tanggal: "15 Februari 2026",
      kategori: "Ibadah",
      gambar:
        "https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=1000&auto=format&fit=crop",
      deskripsi:
        "Suasana ibadah raya minggu pagi yang penuh khidmat, diisi dengan pujian penyembahan dan pemberitaan Firman Tuhan bagi seluruh jemaat.",
    },
    {
      id: 2,
      judul: "Persekutuan Pemuda (Youth)",
      tanggal: "14 Februari 2026",
      kategori: "Pemuda",
      gambar:
        "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1000&auto=format&fit=crop",
      deskripsi:
        "Kegiatan rutin mingguan pemuda-pemudi GPdI Sibulele untuk saling menguatkan dalam iman melalui sharing dan diskusi alkitabiah.",
    },
    {
      id: 3,
      judul: "Sekolah Minggu Ceria",
      tanggal: "15 Februari 2026",
      kategori: "Sekolah Minggu",
      gambar:
        "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?q=80&w=1000&auto=format&fit=crop",
      deskripsi:
        "Anak-anak sekolah minggu belajar tentang kasih Tuhan melalui cerita alkitab, permainan edukatif, dan bernyanyi bersama.",
    },
    {
      id: 4,
      judul: "Ibadah Persekutuan Wanita",
      tanggal: "12 Februari 2026",
      kategori: "Wanita",
      gambar:
        "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1000&auto=format&fit=crop",
      deskripsi:
        "Persekutuan rutin kaum wanita untuk berdoa bersama dan mendukung pelayanan di tengah keluarga serta gereja.",
    },
    {
      id: 5,
      judul: "Pelaksanaan Baptisan Air",
      tanggal: "01 Februari 2026",
      kategori: "Ibadah",
      gambar:
        "https://images.unsplash.com/photo-1519491050282-ce00c7294894?q=80&w=1000&auto=format&fit=crop",
      deskripsi:
        "Momen sakral pelaksanaan baptisan air bagi jemaat yang menyerahkan diri sepenuhnya untuk mengikut Kristus.",
    },
    {
      id: 6,
      judul: "Latihan Musik & Praise",
      tanggal: "13 Februari 2026",
      kategori: "Pemuda",
      gambar:
        "https://images.unsplash.com/photo-1514320298573-63e2865248a3?q=80&w=1000&auto=format&fit=crop",
      deskripsi:
        "Tim musik dan singers melakukan latihan rutin untuk mempersiapkan pelayanan yang terbaik bagi kemuliaan nama Tuhan.",
    },
    {
      id: 7,
      judul: "Perayaan Natal Anak",
      tanggal: "25 Desember 2025",
      kategori: "Sekolah Minggu",
      gambar:
        "https://images.unsplash.com/photo-1543589077-47d81606c1ad?q=80&w=1000&auto=format&fit=crop",
      deskripsi:
        "Kemeriahan perayaan natal anak sekolah minggu dengan berbagai penampilan bakat dan pembagian bingkisan kasih.",
    },
    {
      id: 8,
      judul: "Seminar Pembinaan Wanita",
      tanggal: "10 Januari 2026",
      kategori: "Wanita",
      gambar:
        "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=1000&auto=format&fit=crop",
      deskripsi:
        "Seminar khusus bagi kaum wanita mengenai peran ibu dalam mendidik anak secara kristiani di era digital.",
    },
    {
      id: 9,
      judul: "Doa Malam Bersama",
      tanggal: "11 Februari 2026",
      kategori: "Ibadah",
      gambar:
        "https://images.unsplash.com/photo-1445053023192-8d45cb66099d?q=80&w=1000&auto=format&fit=crop",
      deskripsi:
        "Persekutuan doa malam jemaat untuk mendoakan pergumulan bangsa, gereja, dan setiap anggota jemaat.",
    },
    {
      id: 10,
      judul: "Retreat Pemuda Sibulele",
      tanggal: "20 Januari 2026",
      kategori: "Pemuda",
      gambar:
        "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=1000&auto=format&fit=crop",
      deskripsi:
        "Kegiatan luar ruangan pemuda untuk membangun keakraban dan penyegaran rohani di alam terbuka.",
    },
    {
      id: 11,
      judul: "Kunjungan Kasih Lansia",
      tanggal: "05 Februari 2026",
      kategori: "Wanita",
      gambar:
        "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=1000&auto=format&fit=crop",
      deskripsi:
        "Pelayanan kunjungan kasih kepada anggota jemaat yang lansia untuk memberikan dukungan moral dan doa.",
    },
    {
      id: 12,
      judul: "Cerdas Cermat Alkitab Anak",
      tanggal: "08 Februari 2026",
      kategori: "Sekolah Minggu",
      gambar:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1000&auto=format&fit=crop",
      deskripsi:
        "Lomba cerdas cermat alkitab untuk meningkatkan minat anak-anak sekolah minggu dalam mendalami isi alkitab.",
    },
  ],
};
