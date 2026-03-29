import React, { useState, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { KELUARGA_DATA, RIWAYAT_SURAT } from '../../data/dummyUsers';

// ─── JENIS SURAT ─────────────────────────────────────────────────────────────
const JENIS_SURAT = [
  { id: 'baptis',       label: 'Surat Keterangan Baptis'   },
  { id: 'nikah',        label: 'Surat Nikah'               },
  { id: 'pindah',       label: 'Surat Pindah Jemaat'       },
  { id: 'administrasi', label: 'Surat Administrasi Lainnya'},
];

const FORM_AWAL = {
  nama: '', nik: '', tempat_tgl_lahir: '', alamat: '',
  telepon: '', jenis_surat: 'Surat Keterangan Baptis',
  keperluan: '', tanggal_pengajuan: new Date().toLocaleDateString('id-ID'),
  keterangan: '', anggota_id: '',
};

// ─── KOMPONEN PREVIEW SURAT ───────────────────────────────────────────────────
const PreviewSurat = ({ form, user }) => {
  const nomorSurat = `${String(Math.floor(Math.random() * 900) + 100)}/GPdI-SIB/${new Date().getFullYear()}`;
  const tglSurat   = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

  const isiSurat = () => {
    const nama = form.nama || '[Nama]';
    const nik  = form.nik  || '[NIK]';
    const ttl  = form.tempat_tgl_lahir || '[Tempat, Tanggal Lahir]';
    const almt = form.alamat || '[Alamat]';

    switch (form.jenis_surat) {
      case 'Surat Keterangan Baptis':
        return `Yang bertanda tangan di bawah ini, Pendeta Gereja Pantekosta di Indonesia (GPdI) Jemaat Sibulele, dengan ini menerangkan bahwa:\n\nNama Lengkap   : ${nama}\nNIK               : ${nik}\nTempat/Tgl Lahir : ${ttl}\nAlamat            : ${almt}\n\nadalah benar merupakan anggota jemaat GPdI Sibulele dan telah menerima Baptisan Air secara resmi di gereja ini.\n\nSurat keterangan ini dibuat untuk keperluan: ${form.keperluan || '[Keperluan]'}\n\nDemikian surat keterangan ini dibuat dengan sebenarnya untuk dapat dipergunakan sebagaimana mestinya.`;
      case 'Surat Nikah':
        return `Yang bertanda tangan di bawah ini, Pendeta Gereja Pantekosta di Indonesia (GPdI) Jemaat Sibulele, dengan ini menerangkan bahwa:\n\nNama Lengkap   : ${nama}\nNIK               : ${nik}\nTempat/Tgl Lahir : ${ttl}\nAlamat            : ${almt}\n\ntelah melangsungkan pernikahan secara Kristiani di hadapan Tuhan dan jemaat GPdI Sibulele.\n\nSurat ini dibuat untuk keperluan: ${form.keperluan || '[Keperluan]'}\n\nDemikian surat keterangan ini dibuat untuk dapat dipergunakan sebagaimana mestinya.`;
      case 'Surat Pindah Jemaat':
        return `Yang bertanda tangan di bawah ini, Pendeta Gereja Pantekosta di Indonesia (GPdI) Jemaat Sibulele, dengan ini menerangkan bahwa:\n\nNama Lengkap   : ${nama}\nNIK               : ${nik}\nTempat/Tgl Lahir : ${ttl}\nAlamat            : ${almt}\n\nadalah benar terdaftar sebagai anggota jemaat aktif di GPdI Sibulele dan bermaksud untuk pindah ke jemaat yang dituju.\n\nKeperluan: ${form.keperluan || '[Keperluan]'}\n\nKami melepas dengan berkat dan mendoakan agar saudara/i terus bertumbuh dalam iman di tempat yang baru.`;
      default:
        return `Yang bertanda tangan di bawah ini, Pendeta Gereja Pantekosta di Indonesia (GPdI) Jemaat Sibulele, dengan ini menerangkan bahwa:\n\nNama Lengkap   : ${nama}\nNIK               : ${nik}\nTempat/Tgl Lahir : ${ttl}\nAlamat            : ${almt}\n\n${form.keterangan || 'Isi surat akan ditampilkan di sini berdasarkan data form yang diisi.'}\n\nKeperluan: ${form.keperluan || '[Keperluan]'}\n\nDemikian surat ini dibuat untuk dapat dipergunakan sebagaimana mestinya.`;
    }
  };

  return (
    <div className="bg-gray-100 border border-gray-300 p-8 min-h-[700px] font-sans text-sm text-slate-800">
      {/* Kop Surat */}
      <div className="flex items-center justify-center mb-6 pb-4 border-b-2 border-slate-800">
        <div className="w-16 h-16 bg-slate-800 flex items-center justify-center text-white font-bold text-xl mr-4 flex-shrink-0">G</div>
        <div className="text-center">
          <p className="font-bold text-base text-slate-900">Kop Surat Gereja</p>
          <p className="text-slate-600 text-xs">Gereja Pantekosta di Indonesia - Jemaat Sibulele</p>
          <p className="text-slate-600 text-xs">Jl. Contoh No. 123, Kota A, Provinsi A, 12345</p>
          <p className="text-slate-600 text-xs">Telp: +62 123 4567 890 | Email: gpdi.sibulele@gmail.com</p>
        </div>
      </div>

      {/* Judul Surat */}
      <div className="text-center mb-5">
        <p className="font-bold text-base uppercase tracking-wide underline">
          {form.jenis_surat || 'SURAT KETERANGAN'}
        </p>
      </div>

      {/* Nomor Surat */}
      <p className="mb-5">
        Nomor Surat :{' '}
        <span className="underline">{nomorSurat}</span>
      </p>

      {/* Isi Surat */}
      <div className="leading-relaxed whitespace-pre-line mb-8">
        {isiSurat()}
      </div>

      {/* Tempat & Tanggal */}
      <div className="text-right mb-12">
        <p>Sibulele, {tglSurat}</p>
      </div>

      {/* Tanda Tangan */}
      <div className="text-right">
        <p>Hormat Kami,</p>
        <div className="mt-14">
          <div className="inline-block text-center">
            <div className="border-b border-slate-800 w-40 mb-1" />
            <p className="font-bold">Pdt. Samuel Manurung</p>
            <p className="text-slate-600">Gembala Sidang</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── KOMPONEN MODAL TAMBAH ANGGOTA KELUARGA ───────────────────────────────────
const ModalTambahKeluarga = ({ onClose, onSimpan }) => {
  const [form, setForm] = useState({ nama: '', hubungan: 'Suami', tgl_lahir: '', nik: '' });
  const hubunganOptions = ['Suami', 'Istri', 'Anak', 'Orang Tua', 'Saudara', 'Lainnya'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="bg-[#0a1172] px-6 py-4 flex justify-between items-center rounded-t-lg">
          <h3 className="font-bold text-white text-base">Tambah Anggota Keluarga</h3>
          <button onClick={onClose} className="text-white/70 hover:text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap</label>
            <input type="text" value={form.nama} onChange={(e) => setForm({...form, nama: e.target.value})}
              className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nama lengkap anggota keluarga"/>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Hubungan Keluarga</label>
            <select value={form.hubungan} onChange={(e) => setForm({...form, hubungan: e.target.value})}
              className="w-full px-3 py-2 border border-slate-300 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              {hubunganOptions.map((h) => <option key={h}>{h}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Tempat & Tanggal Lahir</label>
            <input type="text" value={form.tgl_lahir} onChange={(e) => setForm({...form, tgl_lahir: e.target.value})}
              className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Contoh: Medan, 01 Januari 1990"/>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">NIK</label>
            <input type="text" value={form.nik} onChange={(e) => setForm({...form, nik: e.target.value})}
              className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="16 digit NIK"/>
          </div>
        </div>
        <div className="px-6 pb-6 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-sm font-semibold border border-slate-300 text-slate-600 hover:bg-slate-100 rounded transition">Batal</button>
          <button onClick={() => { if (form.nama) onSimpan(form); }}
            className="px-4 py-2 text-sm font-bold text-white bg-[#0a1172] hover:bg-blue-900 rounded transition">
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── KOMPONEN UTAMA ───────────────────────────────────────────────────────────
const RequestSuratPage = () => {
  const { user } = useAuth();
  const previewRef = useRef(null);

  const [form, setForm]                 = useState(FORM_AWAL);
  const [showPreview, setShowPreview]   = useState(false);
  const [activeTab, setActiveTab]       = useState('form'); // 'form' | 'riwayat' | 'keluarga'
  const [modalKeluarga, setModalKeluarga] = useState(false);
  const [suksesPesan, setSuksesPesan]   = useState('');

  // Data keluarga dari dummy (state lokal untuk simulasi tambah)
  const [keluarga, setKeluarga] = useState(
    KELUARGA_DATA[user?.id] || []
  );
  const riwayat = RIWAYAT_SURAT[user?.id] || [];

  // Ketika pilih anggota keluarga → isi form otomatis
  const handlePilihAnggota = (anggota) => {
    setForm((prev) => ({
      ...prev,
      anggota_id:       String(anggota.id),
      nama:             anggota.nama,
      nik:              anggota.nik,
      tempat_tgl_lahir: anggota.tgl_lahir,
    }));
  };

  // Ketika pilih jenis surat dari kartu
  const handlePilihJenis = (label) => {
    setForm((prev) => ({ ...prev, jenis_surat: label }));
  };

  const handleReset = () => {
    setForm(FORM_AWAL);
    setShowPreview(false);
    setSuksesPesan('');
  };

  const handleGenerate = () => {
    setSuksesPesan('✅ Surat berhasil digenerate! Silakan download di bawah.');
    setShowPreview(true);
    setTimeout(() => previewRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const handleTambahKeluarga = (dataKeluarga) => {
    const newMember = { ...dataKeluarga, id: keluarga.length + 1 };
    setKeluarga([...keluarga, newMember]);
    setModalKeluarga(false);
    setSuksesPesan('✅ Anggota keluarga berhasil ditambahkan!');
    setTimeout(() => setSuksesPesan(''), 3000);
  };

  const statusBadge = (status) => {
    const map = {
      'Selesai':  'bg-green-100 text-green-700 border-green-200',
      'Diproses': 'bg-amber-100 text-amber-700 border-amber-200',
      'Ditolak':  'bg-red-100 text-red-700 border-red-200',
    };
    return map[status] || 'bg-slate-100 text-slate-600 border-slate-200';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">

      {/* ══ JUDUL ══════════════════════════════════════════════════════════ */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900"
          style={{ fontFamily: "'Courier New', Courier, monospace" }}>
          Layanan Surat Jemaat
        </h1>
        <p className="text-slate-500 mt-1 text-sm">
          Pengajuan dan Pembuatan Surat Administrasi Gereja Secara Online
        </p>
      </div>

      {/* ══ TAB NAVIGASI ═══════════════════════════════════════════════════ */}
      <div className="border-b border-slate-200 mb-6">
        <nav className="flex gap-6">
          {[
            { id: 'form',     label: '📄 Request Surat'     },
            { id: 'keluarga', label: '👨‍👩‍👧‍👦 Anggota Keluarga'   },
            { id: 'riwayat',  label: '📋 Riwayat Surat'     },
          ].map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`py-3 text-sm font-semibold border-b-2 transition ${
                activeTab === tab.id
                  ? 'border-[#0a1172] text-[#0a1172]'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Pesan sukses global */}
      {suksesPesan && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded text-sm">
          {suksesPesan}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          TAB 1: FORM REQUEST SURAT
      ══════════════════════════════════════════════════════════════════ */}
      {activeTab === 'form' && (
        <div>
          {/* ── Pilih Anggota Keluarga (opsional) ─────────────────────── */}
          {keluarga.length > 0 && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded">
              <p className="text-sm font-bold text-blue-800 mb-2">
                Pilih Anggota Keluarga (isi form otomatis):
              </p>
              <div className="flex flex-wrap gap-2">
                {keluarga.map((a) => (
                  <button key={a.id} onClick={() => handlePilihAnggota(a)}
                    className={`px-3 py-1.5 text-xs font-semibold border rounded transition ${
                      form.anggota_id === String(a.id)
                        ? 'bg-[#0a1172] text-white border-[#0a1172]'
                        : 'bg-white text-slate-700 border-slate-300 hover:border-[#0a1172] hover:text-[#0a1172]'
                    }`}>
                    {a.nama} ({a.hubungan})
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Pilih Jenis Surat ─────────────────────────────────────── */}
          <p className="font-bold text-slate-800 text-sm mb-3">Pilih Jenis Surat</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {JENIS_SURAT.map((j) => (
              <div key={j.id}
                className={`border-2 rounded p-3 cursor-pointer transition ${
                  form.jenis_surat === j.label
                    ? 'border-[#0a1172] bg-blue-50'
                    : 'border-slate-300 bg-white hover:border-slate-500'
                }`}>
                {/* Ikon placeholder */}
                <div className="w-10 h-10 bg-slate-800 mb-2 flex items-center justify-center rounded">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                </div>
                <p className="text-xs font-semibold text-slate-700 leading-tight mb-2">{j.label}</p>
                <button onClick={() => handlePilihJenis(j.label)}
                  className={`text-xs px-3 py-1 font-bold transition rounded ${
                    form.jenis_surat === j.label
                      ? 'bg-[#0a1172] text-white'
                      : 'bg-slate-800 text-white hover:bg-slate-700'
                  }`}>
                  Isi Form
                </button>
              </div>
            ))}
          </div>

          {/* ── Form Input ───────────────────────────────────────────────── */}
          <div className="space-y-4">

            {[
              { label: 'Nama Lengkap',         field: 'nama',             type: 'text', placeholder: 'Isi di sini' },
              { label: 'NIK / Nomor Identitas', field: 'nik',              type: 'text', placeholder: 'Isi di sini' },
              { label: 'Tempat & Tanggal Lahir',field: 'tempat_tgl_lahir', type: 'text', placeholder: 'Isi di sini' },
              { label: 'Alamat',                field: 'alamat',           type: 'text', placeholder: 'Isi di sini' },
              { label: 'Nomor Telepon',          field: 'telepon',          type: 'text', placeholder: 'Isi di sini' },
            ].map(({ label, field, type, placeholder }) => (
              <div key={field}>
                <label className="block font-bold text-slate-800 text-sm mb-1">{label}</label>
                <input type={type} value={form[field]}
                  onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                  placeholder={placeholder}
                  className="w-full px-3 py-2.5 border border-slate-400 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
              </div>
            ))}

            {/* Jenis Surat (read-only, dari pilihan kartu) */}
            <div>
              <label className="block font-bold text-slate-800 text-sm mb-1">Jenis Surat</label>
              <input readOnly value={form.jenis_surat}
                className="w-full px-3 py-2.5 border border-slate-400 rounded text-sm bg-gray-50 cursor-default"/>
            </div>

            {/* Keperluan */}
            <div>
              <label className="block font-bold text-slate-800 text-sm mb-1">Keperluan Surat</label>
              <input type="text" value={form.keperluan}
                onChange={(e) => setForm({ ...form, keperluan: e.target.value })}
                placeholder="Isi disini"
                className="w-full px-3 py-2.5 border border-slate-400 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>

            {/* Tanggal Pengajuan */}
            <div>
              <label className="block font-bold text-slate-800 text-sm mb-1">Tanggal Pengajuan</label>
              <input readOnly value={form.tanggal_pengajuan}
                className="w-full px-3 py-2.5 border border-slate-400 rounded text-sm bg-gray-50 cursor-default"/>
            </div>

            {/* Upload Dokumen */}
            <div>
              <label className="block font-bold text-slate-800 text-sm mb-1">Upload Dokumen Pendukung</label>
              <input type="file" accept=".pdf,.jpg,.jpeg,.png"
                className="w-full px-3 py-2 border border-slate-400 rounded text-sm text-slate-600 file:mr-3 file:py-1 file:px-3 file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200"/>
            </div>

            {/* Keterangan Tambahan */}
            <div>
              <label className="block font-bold text-slate-800 text-sm mb-1">Keterangan Tambahan</label>
              <textarea rows={4} value={form.keterangan}
                onChange={(e) => setForm({ ...form, keterangan: e.target.value })}
                placeholder="Tambahkan Keterangan Tambahan"
                className="w-full px-3 py-2.5 border border-slate-400 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"/>
            </div>
          </div>

          {/* ── Tombol Aksi ──────────────────────────────────────────────── */}
          <div className="flex flex-wrap gap-3 mt-6">
            <button onClick={() => { setShowPreview(true); setTimeout(() => previewRef.current?.scrollIntoView({ behavior: 'smooth' }), 100); }}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold transition">
              Preview PDF
            </button>
            <button onClick={handleGenerate}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold transition">
              Generate PDF
            </button>
            <button onClick={handleReset}
              className="px-5 py-2.5 border-2 border-slate-700 bg-white text-slate-800 text-sm font-bold hover:bg-slate-100 transition">
              Reset Form
            </button>
          </div>

          <p className="text-slate-500 text-xs mt-3 italic">
            Surat akan otomatis terformat dalam bentuk PDF resmi gereja setelah form selesai diisi.
          </p>

          {/* ── Preview Surat ─────────────────────────────────────────────── */}
          {showPreview && (
            <div className="mt-8" ref={previewRef}>
              <PreviewSurat form={form} user={user} />

              {/* Tombol Download */}
              <div className="mt-4 flex justify-center">
                <button
                  onClick={() => { setSuksesPesan('✅ Surat sedang didownload... (simulasi)'); setTimeout(() => setSuksesPesan(''), 3000); }}
                  className="px-10 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm transition shadow-md">
                  Download PDF
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          TAB 2: ANGGOTA KELUARGA
      ══════════════════════════════════════════════════════════════════ */}
      {activeTab === 'keluarga' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-800">Anggota Keluarga</h2>
              <p className="text-slate-500 text-sm">Data anggota keluarga yang terdaftar di gereja</p>
            </div>
            <button onClick={() => setModalKeluarga(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#0a1172] hover:bg-blue-900 text-white text-sm font-bold rounded transition">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
              </svg>
              Tambah Anggota
            </button>
          </div>

          {keluarga.length === 0 ? (
            <div className="py-16 text-center text-slate-400 border border-slate-200 rounded">
              Belum ada anggota keluarga yang terdaftar.
            </div>
          ) : (
            <div className="border border-slate-300 overflow-hidden rounded">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 border-b border-slate-300">
                  <tr>
                    {['No', 'Nama Lengkap', 'Hubungan', 'Tgl Lahir', 'NIK'].map((h) => (
                      <th key={h} className="px-4 py-3 font-bold text-slate-700 text-xs uppercase">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {keluarga.map((a, idx) => (
                    <tr key={a.id} className="hover:bg-slate-50 transition">
                      <td className="px-4 py-3 text-slate-500">{idx + 1}</td>
                      <td className="px-4 py-3 font-medium text-slate-800">{a.nama}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded border font-semibold ${
                          a.hubungan === 'Kepala Keluarga' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                          a.hubungan === 'Suami' || a.hubungan === 'Istri' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                          'bg-green-50 text-green-700 border-green-200'
                        }`}>
                          {a.hubungan}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-600">{a.tgl_lahir}</td>
                      <td className="px-4 py-3 text-slate-600 font-mono text-xs">{a.nik}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-5 p-4 bg-amber-50 border border-amber-200 rounded text-sm text-amber-700">
            <p className="font-bold mb-1">💡 Catatan:</p>
            <p>Data anggota keluarga yang sudah ditambahkan dapat dipilih otomatis saat mengisi formulir Request Surat di tab pertama.</p>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════
          TAB 3: RIWAYAT SURAT
      ══════════════════════════════════════════════════════════════════ */}
      {activeTab === 'riwayat' && (
        <div>
          <h2 className="text-lg font-bold text-slate-800 mb-1">Riwayat Pengajuan Surat</h2>
          <p className="text-slate-500 text-sm mb-4">Daftar surat yang pernah diajukan</p>

          {riwayat.length === 0 ? (
            <div className="py-16 text-center text-slate-400 border border-slate-200 rounded">
              Belum ada riwayat pengajuan surat.
            </div>
          ) : (
            <div className="border border-slate-300 overflow-hidden rounded">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 border-b border-slate-300">
                  <tr>
                    {['No. Surat', 'Jenis Surat', 'Atas Nama', 'Tgl Pengajuan', 'Status'].map((h) => (
                      <th key={h} className="px-4 py-3 font-bold text-slate-700 text-xs uppercase">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {riwayat.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50 transition">
                      <td className="px-4 py-3 font-mono text-xs text-slate-600">{s.id}</td>
                      <td className="px-4 py-3 font-medium text-slate-800">{s.jenis}</td>
                      <td className="px-4 py-3 text-slate-600">{s.nama}</td>
                      <td className="px-4 py-3 text-slate-600">{s.tanggal}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2.5 py-0.5 rounded border font-semibold ${statusBadge(s.status)}`}>
                          {s.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ── Modal Tambah Anggota Keluarga ──────────────────────────────── */}
      {modalKeluarga && (
        <ModalTambahKeluarga
          onClose={() => setModalKeluarga(false)}
          onSimpan={handleTambahKeluarga}
        />
      )}
    </div>
  );
};

export default RequestSuratPage;