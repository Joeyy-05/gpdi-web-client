// src/data/dummyUsers.js
// Data dummy untuk simulasi login berbagai role

export const DUMMY_USERS = [
  // ── PENDETA / ADMIN ──────────────────────────────────────────────────────
  {
    id: 1,
    name: 'Pdt. Samuel Manurung',
    email: 'pendeta@gpdi.com',
    password: 'pendeta123',
    role: 'pendeta',
    avatar: 'PS',
    rayon_id: null,
  },

  // ── KETUA RAYON ──────────────────────────────────────────────────────────
  {
    id: 2,
    name: 'Bpk. Hendra Lumban Gaol',
    email: 'rayon1@gpdi.com',
    password: 'rayon123',
    role: 'ketua_rayon',
    avatar: 'HL',
    rayon_id: 1,
  },
  {
    id: 3,
    name: 'Bpk. Roni Siahaan',
    email: 'rayon2@gpdi.com',
    password: 'rayon123',
    role: 'ketua_rayon',
    avatar: 'RS',
    rayon_id: 2,
  },

  // ── JEMAAT BIASA ─────────────────────────────────────────────────────────
  {
    id: 4,
    name: 'Ibu. Maria Situmorang',
    email: 'jemaat@gpdi.com',
    password: 'jemaat123',
    role: 'jemaat',
    avatar: 'MS',
    rayon_id: 1,
  },
  {
    id: 5,
    name: 'Sdr. Jonatan Sinaga',
    email: 'jonatan@gpdi.com',
    password: 'jemaat123',
    role: 'jemaat',
    avatar: 'JS',
    rayon_id: 2,
  },
];

// ── DATA RAYON ───────────────────────────────────────────────────────────────
export const RAYON_DATA = [
  {
    id: 1,
    nama: 'Rayon 1 - Yerusalem',
    ketua: 'Bpk. Hendra Lumban Gaol',
    wilayah: 'Jl. Sudirman & sekitarnya',
    jadwal_aktif: {
      tanggal: '06 April 2025',
      waktu: '18.30 WIB',
      lokasi: 'Rumah Bpk. Hendra - Jl. Sudirman No. 12',
      pelayan_firman: 'Pdt. Samuel Manurung',
      penanggung_jawab: 'Bpk. Hendra Lumban Gaol',
      status: 'Aktif',
    },
    riwayat: [
      { tanggal: '30/03/2025', lokasi: 'Rumah Ibu. Sari - Jl. Melati No. 5',  pelayan: 'Pdt. Samuel Manurung', status: 'Selesai' },
      { tanggal: '23/03/2025', lokasi: 'Rumah Bpk. Anton - Jl. Kenanga No. 3', pelayan: 'Ev. Budi Santoso',     status: 'Selesai' },
      { tanggal: '16/03/2025', lokasi: 'Rumah Bpk. Hendra - Jl. Sudirman No. 12', pelayan: 'Pdt. Samuel Manurung', status: 'Dibatalkan' },
    ],
    notifikasi: [
      { pesan: '"Jadwal Ibadah Rayon tanggal 06/04/2025 telah diperbarui."',    waktu: '2 jam lalu' },
      { pesan: '"Jadwal Ibadah Rayon minggu lalu telah selesai dilaksanakan."', waktu: '7 hari lalu' },
    ],
  },
  {
    id: 2,
    nama: 'Rayon 2 - Nazaret',
    ketua: 'Bpk. Roni Siahaan',
    wilayah: 'Jl. Diponegoro & sekitarnya',
    jadwal_aktif: {
      tanggal: '07 April 2025',
      waktu: '19.00 WIB',
      lokasi: 'Rumah Bpk. Roni - Jl. Diponegoro No. 8',
      pelayan_firman: 'Ev. Budi Santoso',
      penanggung_jawab: 'Bpk. Roni Siahaan',
      status: 'Aktif',
    },
    riwayat: [
      { tanggal: '31/03/2025', lokasi: 'Rumah Ibu. Dewi - Jl. Mawar No. 7',   pelayan: 'Pdt. Samuel Manurung', status: 'Selesai' },
      { tanggal: '24/03/2025', lokasi: 'Rumah Bpk. Roni - Jl. Diponegoro No. 8', pelayan: 'Ev. Budi Santoso',  status: 'Dibatalkan' },
    ],
    notifikasi: [
      { pesan: '"Jadwal Ibadah Rayon tanggal 07/04/2025 telah diperbarui."',    waktu: '5 jam lalu' },
      { pesan: '"Jadwal Ibadah Rayon minggu ini dibatalkan."',                  waktu: '3 hari lalu' },
    ],
  },
];

// ── DATA KELUARGA JEMAAT ─────────────────────────────────────────────────────
export const KELUARGA_DATA = {
  4: [
    { id: 1, nama: 'Maria Situmorang',     hubungan: 'Kepala Keluarga', tgl_lahir: '12 Maret 1975',    nik: '1271056803750001' },
    { id: 2, nama: 'Bpk. Yohanes Sitorus', hubungan: 'Suami',          tgl_lahir: '05 Januari 1972',  nik: '1271050501720002' },
    { id: 3, nama: 'Ruth Sitorus',          hubungan: 'Anak',           tgl_lahir: '20 Juli 2002',     nik: '1271054907020003' },
    { id: 4, nama: 'Daniel Sitorus',        hubungan: 'Anak',           tgl_lahir: '14 Februari 2005', nik: '1271051402050004' },
  ],
  5: [
    { id: 1, nama: 'Jonatan Sinaga',  hubungan: 'Kepala Keluarga', tgl_lahir: '08 Juni 1988',     nik: '1271050806880001' },
    { id: 2, nama: 'Debora Sinaga',   hubungan: 'Istri',           tgl_lahir: '17 April 1990',    nik: '1271054704900002' },
    { id: 3, nama: 'Ester Sinaga',    hubungan: 'Anak',            tgl_lahir: '03 Desember 2015', nik: '1271050312150003' },
  ],
};

// ── DATA RIWAYAT SURAT ───────────────────────────────────────────────────────
export const RIWAYAT_SURAT = {
  4: [
    { id: 'S-001', jenis: 'Surat Keterangan Baptis', nama: 'Ruth Sitorus',     tanggal: '15 Jan 2025', status: 'Selesai'  },
    { id: 'S-002', jenis: 'Surat Nikah',             nama: 'Maria Situmorang', tanggal: '02 Mar 2025', status: 'Diproses' },
  ],
  5: [
    { id: 'S-003', jenis: 'Surat Pindah Jemaat', nama: 'Jonatan Sinaga', tanggal: '10 Feb 2025', status: 'Selesai' },
  ],
};