import axiosInstance from '../config/axiosInstance';

export const getProfileAPI = async () => {
    try {
        const response = await axiosInstance.get('/user/profile');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const updateProfileAPI = async (profileData) => {
    try {
        const response = await axiosInstance.put('/user/profile', profileData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};