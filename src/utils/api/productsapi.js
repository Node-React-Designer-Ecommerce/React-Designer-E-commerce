import axiosInstance from "./axiosInstance";

export const getAllProducts = async () => {
  return await axiosInstance
    .get("/products")
    .then((res) => res.data.data.products);
};

export const searchProducts = async (searchTerm) => {
  return await axiosInstance
    .get(`/products?search=${searchTerm}`)
    .then((res) => res.data.data.products);
};

export const getProductById = (id) => {
  return axiosInstance
    .get(`/products/${id}`)
    .then((res) => res.data.data.product);
};

export const getIsDesignableProduct = async () => {
  try {
    const res = await axiosInstance.get("/products/designable-products");
    return res.data.data.products; // Ensure this matches the response structure
  } catch (error) {
    console.error("Error fetching designable products:", error);
    throw error; // Rethrow error for handling in your component
  }
};
export const getIsDesignableProductById = async (id) => {
  try {
    const res = await axiosInstance.get(`/products/designable-products/${id}`);

    return res.data.data.designableProduct; // Ensure this matches the response structure
  } catch (error) {
    console.error("Error fetching designable products:", error);
    throw error; // Rethrow error for handling in your component
  }
};
