import axios from "axios";

const API_URL = "https://react-node-designer.glitch.me/api/v1/products";

export const getAllProducts = async () => {
  return await axios.get(API_URL)
  .then( res => res.data.data.products)
};

export const getProductById = (id) => {
 return  axios.get(`${API_URL}/${id}`)
 .then( res => res.data.data.product)
};