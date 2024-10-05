import axiosInstance from "./axiosInstance";

export const createOrder = async (paymentMethod) => {
  try {
    const response = await axiosInstance.post("/orders", paymentMethod);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
