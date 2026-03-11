import axiosInstance from '../config/axiosInstance';

export const getFamilyMembersAPI = async () => {
    try {
        const response = await axiosInstance.get('/user/family-members');
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const addFamilyMemberAPI = async (data) => {
    try {
        const response = await axiosInstance.post('/user/family-members', data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const deleteFamilyMemberAPI = async (id) => {
    try {
        const response = await axiosInstance.delete(`/user/family-members/${id}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};