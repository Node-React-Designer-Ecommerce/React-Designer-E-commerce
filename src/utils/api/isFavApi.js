import axiosInstance from "./axiosInstance";

export const getFavoriteProducts = async () => {
  try {
    const response = await axiosInstance.get("/favorite");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const addToFavorites = async (productId) => {
  try {
    const response = await axiosInstance.post(`/favorite/${productId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const removeFromFavorites = async (productId) => {
  try {
    const response = await axiosInstance.delete(`/favorite/${productId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
