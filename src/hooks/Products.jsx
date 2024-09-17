import { useEffect, useState, createContext, useContext } from "react";
import axios from 'axios';
import PropTypes from "prop-types";

const ProductContext = createContext();

export default function ProductsProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState(null);

    useEffect(() => {

        axios.get(`https://react-node-designer.glitch.me/api/v1/products`)
            .then(res => setProducts(res.data.data.products))
            .catch(error => console.error("Error fetching data", error))
    }, [])

    const getProductById = (id) => {
        axios.get(`https://react-node-designer.glitch.me/api/v1/products/${id}`)
            .then(res => setProduct(res.data.data.product))
            .catch(error => console.error("Error fetching data by ID:", error));
    };

    return (
        <ProductContext.Provider value={{ products, getProductById, product }}>
            {children}
        </ProductContext.Provider>
    )
}
ProductsProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export const useProducts = () => {
    return useContext(ProductContext);
}