import { useState } from 'react';


export const useToggleFavorite = () => {
    const [favoriteProducts, setFavoriteProducts] = useState({});

    const toggleFavorite = (productId) => {
        setFavoriteProducts((prevFavorites) => ({
            ...prevFavorites,
            [productId]: !prevFavorites[productId],
        }));
    };

    return { favoriteProducts, toggleFavorite };
};
