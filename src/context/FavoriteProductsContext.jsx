import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
const FavoriteProductsContext = createContext();

export const useFavoriteProducts = () => useContext(FavoriteProductsContext);

export const FavoriteProductsProvider = ({ children }) => {
  const [favoriteProducts, setFavoriteProducts] = useState({});

  const toggleFavorite = (productId) => {
    setFavoriteProducts((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  return (
    <FavoriteProductsContext.Provider
      value={{
        favoriteProducts,
        toggleFavorite,
      }}
    >
      {children}
    </FavoriteProductsContext.Provider>
  );
};

FavoriteProductsProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };