// import axios from "axios";

// const API_URL = "https://react-node-designer.glitch.me/api/v1/products";

// export const getAllProducts = async () => {
//   return await axios.get(API_URL)
//   .then( res => res.data.data.products)
// };

// export const getProductById = (id) => {
//  return  axios.get(`${API_URL}/${id}`)
//  .then( res => res.data.data.product)
// };

import axiosInstance from "./axiosInstance";

export const getAllProducts = async () => {
  return await axiosInstance
    .get("/products")
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
