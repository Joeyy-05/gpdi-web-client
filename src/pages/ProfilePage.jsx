import React, { useState, useEffect } from 'react';
import { getProfileAPI, updateProfileAPI } from '../services/profileService';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        full_name: '',
        phone_number: '',
        address: ''
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await getProfileAPI();
            if (response.data) {
                setFormData({
                    full_name: response.data.full_name || '',
                    phone_number: response.data.phone_number || '',
                    address: response.data.address || ''
                });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Gagal memuat data profil.' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setMessage({ type: '', text: '' });

        try {
            await updateProfileAPI(formData);
            setMessage({ type: 'success', text: 'Profil berhasil diperbarui!' });
        } catch (error) {
            setMessage({ type: 'error', text: error.message || 'Gagal memperbarui profil.' });
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) return <div style={{ padding: '20px' }}>Memuat profil...</div>;

    return (
        <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h2>Pengaturan Profil</h2>
            <p>Email Akun: <strong>{user?.email}</strong></p>
            
            {message.text && (
                <div style={{ padding: '10px', marginBottom: '15px', backgroundColor: message.type === 'success' ? '#d4edda' : '#f8d7da', color: message.type === 'success' ? '#155724' : '#721c24' }}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                    <label>Nama Lengkap</label>
                    <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
                </div>
                <div>
                    <label>Nomor Telepon</label>
                    <input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
                </div>
                <div>
                    <label>Alamat Domisili</label>
                    <textarea name="address" value={formData.address} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px', minHeight: '80px' }} />
                </div>
                <button type="submit" disabled={isSaving} style={{ padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', cursor: isSaving ? 'not-allowed' : 'pointer' }}>
                    {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>
            </form>
        </div>
    );
};

export default ProfilePage;