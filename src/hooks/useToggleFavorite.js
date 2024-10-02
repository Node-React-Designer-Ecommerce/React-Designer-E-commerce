import { useState, useEffect } from 'react';
import { getFavoriteProducts, addToFavorites, removeFromFavorites } from '../utils/api/isFavApi';

export const useToggleFavorite = () => {
  const [favoriteProducts, setFavoriteProducts] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchFavoriteProducts = async () => {
      try {
        setIsLoading(true);
        const response = await getFavoriteProducts();
        const favorites = response.data.favProducts;
        const favoriteMap = favorites.reduce((acc, product) => {
          acc[product._id] = true;
          return acc;
        }, {});
        setFavoriteProducts(favoriteMap);
      } catch (error) {
        console.error("Error fetching favorite products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavoriteProducts();
  }, []);

  const toggleFavorite = async (productId) => {
    try {
      setIsLoading(true);
      if (favoriteProducts[productId]) {
        await removeFromFavorites(productId);
      } else {
        await addToFavorites(productId);
      }
      const newFavorites = {
        ...favoriteProducts,
        [productId]: !favoriteProducts[productId],
      };
      setFavoriteProducts(newFavorites);
    } catch (error) {
      console.error("Error toggling favorite product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { favoriteProducts, toggleFavorite, isLoading };
};