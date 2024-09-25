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

import axiosInstance from './axiosInstance';

export const getAllProducts = async () => {
    return await axiosInstance.get("/products")
    .then( res => res.data.data.products)
  };

export const searchProducts = async(searchTerm) => {
  return await axiosInstance.get(`/products?search=${searchTerm}`)
    .then(res => res.data.data.products)
};

export const getProductById = (id) => {
  return axiosInstance.get(`/products/${id}`)
    .then(res => res.data.data.product)
};