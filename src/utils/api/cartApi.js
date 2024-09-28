import axiosInstance from "./axiosInstance";

// Add item to cart
export const addToCart = async (data) => {
  try {
    const response = await axiosInstance.post("/cart", data); // /cart is appended to the baseURL
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Get user's cart
export const getCart = async () => {
  try {
    const response = await axiosInstance.get("/cart/"); // Appending /cart
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Remove item from cart
export const removeFromCart = async (cartItemId) => {
  try {
    const response = await axiosInstance.delete(`/cart/${cartItemId}`); // Appending /cart/:cartItemId
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Update cart item
export const updateCartItem = async (cartItemId, data) => {
  try {
    const response = await axiosInstance.patch(`/cart/${cartItemId}`, data); // Appending /cart/:cartItemId
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Set the user's cart (merge cart)
// export const setCart = async (cart) => {
//   try {
//     const response = await axiosInstance.post("/cart/set", { cart }); // Appending /cart/set
//     return response.data;
//   } catch (error) {
//     throw error.response.data;
//   }
// };

// Clear user's cart
export const clearCart = async () => {
  try {
    const response = await axiosInstance.delete("/cart"); // Appending /cart
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
