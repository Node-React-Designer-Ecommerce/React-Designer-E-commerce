import axiosInstance from "./axiosInstance";

export const fetchUserProfile = async () => {
  try {
    const response = await axiosInstance.get("/users/me");
    return response.data.data.user;
  } catch (error) {
    console.error("Error fetching user profile:", error); // Debugging
    throw error;
  }
};

export const updateUserProfile = async (userId, updatedData) => {
  try {
    const response = await axiosInstance.patch(`/users/${userId}`, updatedData);
    return response.data.data.user; // Assuming the response contains the updated user data
  } catch (error) {
    console.error("Error updating user profile:", error); // Debugging
    console.error(
      "Server Response:",
      error.response ? error.response.data : "No response data"
    ); // Debugging
    throw error;
  }
};

export const fetchUserOrders = async () => {
  try {
    const response = await axiosInstance.get("/orders/me");
    return response.data.data.orders;
  } catch (error) {
    console.error("Error fetching user Orders:", error);
    throw error;
  }
};

export const fetchFavoriteProducts = async () => {
  try {
    const response = await axiosInstance.get("/favorite");
    return response.data.data.favProducts;
  } catch (error) {
    console.error("Error fetching favorite products:", error);
    throw error;
  }
};

export const fetchUserDesigns = async () => {
  try {
    const response = await axiosInstance.get("/designs/me");
    return response.data.data.designs;
  } catch (error) {
    console.error("Error fetching favorite products:", error);
    throw error;
  }
};

export const removeFromFavorites = async (productId) => {
  try {
    const response = await axiosInstance.post(`/favorite/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error removing product from favorites:", error);
    throw error;
  }
};
