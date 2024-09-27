import axiosInstance from "./axiosInstance";

export const getProductsInCart = async () => {
  return axiosInstance
    .get(`/user/cart`)
    .then((res) => res.data.data.data.product);
};
