import axiosInstance from './axiosInstance';

export const getAllProducts = async(searchTerm = '') => {
  return await axiosInstance .get('/products', {
    params: { search: searchTerm }, 
  })
    .then(res => res.data.data.products)
};

export const getProductById = (id) => {
  return axiosInstance.get(`/products/${id}`)
    .then(res => res.data.data.product)
};