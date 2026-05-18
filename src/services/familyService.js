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

// FUNGSI BARU: Update Family Member
export const updateFamilyMemberAPI = async (id, data) => {
    try {
        // Sesuai dengan route Laravel: PUT /user/family-members/{id}
        const response = await axiosInstance.put(`/user/family-members/${id}`, data);
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