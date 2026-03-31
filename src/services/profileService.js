import axiosInstance from '../config/axiosInstance';

export const getProfileAPI = async () => {
    try {
        const response = await axiosInstance.get('/user/profile');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

// FUNGSI BARU: Update Profile
export const updateProfileAPI = async (data) => {
    try {
        // Asumsi endpoint backend Anda adalah PUT /user/profile
        const response = await axiosInstance.put('/user/profile', data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

// FUNGSI BARU: Update Password
export const updatePasswordAPI = async (data) => {
    try {
        // Asumsi endpoint backend Anda adalah PUT /user/password
        const response = await axiosInstance.put('/user/password', data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};