import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAPI } from '../services/authService';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        setIsLoading(true);

        try {
            const response = await loginAPI(email, password);
            if (response.status === 'success') {
                // Eksekusi fungsi login di Context
                login(response.data.access_token, response.data.user);
                // Arahkan ke dashboard
                navigate('/dashboard');
            }
        } catch (error) {
            setErrorMsg(error.message || 'Gagal masuk. Periksa kembali email dan kata sandi Anda.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '100px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2 style={{ textAlign: 'center' }}>Portal GPdI Sibulele</h2>
            {errorMsg && <div style={{ color: 'red', marginBottom: '15px', padding: '10px', backgroundColor: '#ffe6e6' }}>{errorMsg}</div>}
            
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                    <label>Email</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>
                <div>
                    <label>Kata Sandi</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>
                <button type="submit" disabled={isLoading} style={{ padding: '10px', backgroundColor: '#0056b3', color: 'white', border: 'none', cursor: isLoading ? 'not-allowed' : 'pointer' }}>
                    {isLoading ? 'Memproses...' : 'Masuk'}
                </button>
            </form>
        </div>
    );
};

export default LoginPage;