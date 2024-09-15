// import { useEffect, useState, createContext, useContext } from "react";
// import axios from 'axios';
// import PropTypes from "prop-types";

// const ProductContext = createContext();

// export default function ProductsProvider({ children }) {
//     const [products, setProducts] = useState([]);

//     useEffect(() => {

//         axios.get(`https://api.escuelajs.co/api/v1/products`)
//             .then(res => setProducts(res.data))
//             .catch(error => console.error("Error fetching data", error))
//     }, [])
//     return (
//         <ProductContext.Provider value={{ products }}>
//             {children}
//         </ProductContext.Provider>
//     )
// }
// ProductContext.propTypes = {
//     children: PropTypes.node.isRequired,
// }

// export const useProducts = () => {
//     return useContext(ProductContext);
// }