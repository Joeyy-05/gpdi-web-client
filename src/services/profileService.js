import axiosInstance from '../config/axiosInstance';

export const getProfileAPI = async () => {
    try {
        // Gateway akan menghantar request ini ke Port 8001 secara automatik
        const response = await axiosInstance.get('/user/profile');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};