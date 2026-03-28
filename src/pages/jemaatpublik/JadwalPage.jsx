import React from "react";

const JadwalPage = () => {
  const jadwal = [
    { hari: "Minggu", jenis: "Ibadah Umum", waktu: "10:00", tempat: "Gedung Utama" },
    { hari: "Rabu", jenis: "Ibadah Doa", waktu: "19:00", tempat: "Aula Gereja" },
  ];

  const events = [
    {
      title: "Perayaan Natal Bersama",
      tanggal: "25 Desember 2024",
      deskripsi: "Ibadah perayaan Natal bersama seluruh jemaat dan keluarga.",
    },
    {
      title: "Retreat Pemuda",
      tanggal: "10-12 Juli 2025",
      deskripsi: "Retreat rohani untuk pemuda gereja diluar kota.",
    },
    {
      title: "Bakti Sosial",
      tanggal: "15 Agustus 2025",
      deskripsi: "Kegiatan sosial membantu masyarakat yang membutuhkan.",
    },
  ];

  const styles = {
    container: { fontFamily: "Arial", padding: "20px" },
    header: { textAlign: "center", marginBottom: "20px" },
    banner: {
      background: "#ccc",
      height: "200px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: "30px",
    },
    section: { marginBottom: "40px" },
    filter: { display: "flex", gap: "10px", marginBottom: "15px" },
    input: { padding: "8px" },
    table: { width: "100%", borderCollapse: "collapse" },
    thtd: { border: "1px solid #aaa", padding: "10px" },
    card: { border: "1px solid #aaa", padding: "15px", marginBottom: "20px" },
    button: {
      marginTop: "10px",
      padding: "8px 15px",
      border: "1px solid #333",
      cursor: "pointer",
      background: "white",
    },
    footer: { background: "#eee", textAlign: "center", padding: "20px" },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Jadwal Ibadah & Kegiatan</h1>
        <p>Informasi Jadwal Ibadah Rutin dan Kegiatan Gereja</p>
      </div>

      <div style={styles.banner}>Placeholder (Foto Gedung)</div>

      <div style={styles.section}>
        <h2>Jadwal Ibadah Rutin</h2>

        <div style={styles.filter}>
          <select style={styles.input}>
            <option>Semua Kegiatan</option>
          </select>
          <input style={styles.input} placeholder="Cari..." />
        </div>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.thtd}>Hari</th>
              <th style={styles.thtd}>Jenis Ibadah</th>
              <th style={styles.thtd}>Waktu</th>
              <th style={styles.thtd}>Tempat</th>
            </tr>
          </thead>
          <tbody>
            {jadwal.map((item, index) => (
              <tr key={index}>
                <td style={styles.thtd}>{item.hari}</td>
                <td style={styles.thtd}>{item.jenis}</td>
                <td style={styles.thtd}>{item.waktu}</td>
                <td style={styles.thtd}>{item.tempat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={styles.section}>
        <h2>Kegiatan Khusus / Event Gereja</h2>

        {events.map((event, index) => (
          <div key={index} style={styles.card}>
            <h3>{event.title}</h3>
            <p><b>Tanggal:</b> {event.tanggal}</p>
            <p><b>Deskripsi:</b> {event.deskripsi}</p>
            <button style={styles.button}>Detail</button>
          </div>
        ))}
      </div>

      <footer style={styles.footer}>
        <h4>GPdI Sibulele</h4>
        <p>Jalan Contoh No.123, Kota A, Provinsi A, 12345</p>
        <p>© 2026 GPdI Jemaat Sibulele. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default JadwalPage;