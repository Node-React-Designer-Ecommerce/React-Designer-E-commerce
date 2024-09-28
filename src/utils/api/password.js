import axiosInstance from "./axiosInstance";

export const sendResetPasswordEmail = async (email) => {
  try {
    const response = await axiosInstance.post("/users/forgot-password", {
      email,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const resetPassword = async (token, password, passwordConfirm) => {
  try {
    const response = await axiosInstance.patch(
      `/users/reset-password/${token}`,
      {
        password,
        passwordConfirm,
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
