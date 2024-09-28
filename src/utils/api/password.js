import axiosInstance from './axiosInstance';


export const sendResetPasswordEmail = async (email) => {
    try {
        const response = await axiosInstance.post('/users/forgot-password', { email });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};