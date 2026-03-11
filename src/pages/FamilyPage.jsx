import React, { useState, useEffect } from 'react';
import { getFamilyMembersAPI, addFamilyMemberAPI, deleteFamilyMemberAPI } from '../services/familyService';
import { useAuth } from '../context/AuthContext';

const FamilyPage = () => {
    const { user } = useAuth();
    const [members, setMembers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);
    const [message, setMessage] = useState('');
    
    const [formData, setFormData] = useState({
        full_name: '',
        relationship: '',
        gender: 'L',
        birth_date: ''
    });

    useEffect(() => {
        if (user?.role === 'jemaat_aktif') {
            fetchMembers();
        } else {
            setIsLoading(false);
        }
    }, [user]);

    const fetchMembers = async () => {
        try {
            const response = await getFamilyMembersAPI();
            setMembers(response.data || []);
        } catch (error) {
            setMessage('Gagal memuat data anggota keluarga.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);
        setMessage('');

        try {
            await addFamilyMemberAPI(formData);
            setMessage('Anggota keluarga berhasil ditambahkan.');
            setFormData({ full_name: '', relationship: '', gender: 'L', birth_date: '' });
            fetchMembers(); // Segarkan tabel
        } catch (error) {
            setMessage(error.message || 'Gagal menambahkan data.');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Anda yakin ingin menghapus anggota ini?')) return;
        
        try {
            await deleteFamilyMemberAPI(id);
            setMessage('Data berhasil dihapus.');
            fetchMembers();
        } catch (error) {
            setMessage('Gagal menghapus data.');
        }
    };

    // Restriksi Antarmuka (Akses Kontrol)
    if (user?.role !== 'jemaat_aktif') {
        return (
            <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', textAlign: 'center', border: '1px solid red', color: 'red' }}>
                <h2>Akses Ditolak</h2>
                <p>Halaman ini hanya dapat diakses oleh akun dengan status Jemaat Aktif.</p>
            </div>
        );
    }

    if (isLoading) return <div style={{ padding: '20px' }}>Memuat data...</div>;

    return (
        <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px' }}>
            <h2>Manajemen Anggota Keluarga</h2>
            {message && <div style={{ padding: '10px', marginBottom: '15px', backgroundColor: '#e2e3e5' }}>{message}</div>}

            <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
                <h3>Tambah Anggota Baru</h3>
                <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <input type="text" name="full_name" placeholder="Nama Lengkap" value={formData.full_name} onChange={handleChange} required style={{ flex: '1', padding: '8px' }} />
                    <input type="text" name="relationship" placeholder="Hubungan (Anak/Istri/Suami)" value={formData.relationship} onChange={handleChange} required style={{ flex: '1', padding: '8px' }} />
                    <select name="gender" value={formData.gender} onChange={handleChange} style={{ padding: '8px' }}>
                        <option value="L">Laki-laki</option>
                        <option value="P">Perempuan</option>
                    </select>
                    <input type="date" name="birth_date" value={formData.birth_date} onChange={handleChange} required style={{ padding: '8px' }} />
                    <button type="submit" disabled={isProcessing} style={{ padding: '8px 15px', backgroundColor: '#0056b3', color: 'white', border: 'none', cursor: 'pointer' }}>Tambah</button>
                </form>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
                <thead style={{ backgroundColor: '#f4f4f4' }}>
                    <tr>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Nama</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Hubungan</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>L/P</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Tgl Lahir</th>
                        <th style={{ padding: '10px', border: '1px solid #ddd' }}>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {members.length === 0 ? (
                        <tr><td colSpan="5" style={{ padding: '15px', textAlign: 'center' }}>Belum ada data keluarga.</td></tr>
                    ) : (
                        members.map(member => (
                            <tr key={member.id}>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{member.full_name}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{member.relationship}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>{member.gender}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{member.birth_date}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>
                                    <button onClick={() => handleDelete(member.id)} style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>Hapus</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default FamilyPage;