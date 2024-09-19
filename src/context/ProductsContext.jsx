import { useEffect, useState, createContext, useContext } from "react";
import axios from 'axios';
import PropTypes from "prop-types";

const ProductContext = createContext();

export default function ProductsProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [favoriteProducts, setFavoriteProducts] = useState({}); 

    useEffect(() => {
        setLoading(true);
        axios.get(`https://react-node-designer.glitch.me/api/v1/products`)
            .then(res => {
                setProducts(res.data.data.products);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching data", error);
                setLoading(false);
            });
    }, []);

    const getProductById = (id) => {
        axios.get(`https://react-node-designer.glitch.me/api/v1/products/${id}`)
            .then(res => setProduct(res.data.data.product))
            .catch(error => console.error("Error fetching data by ID:", error));
    };

    const toggleFavorite = (productId) => {
        setFavoriteProducts((prevFavorites) => ({
            ...prevFavorites,
            [productId]: !prevFavorites[productId],
        }));
    };

    return (
        <ProductContext.Provider value={{ products, getProductById, product, loading, favoriteProducts, toggleFavorite }}>
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