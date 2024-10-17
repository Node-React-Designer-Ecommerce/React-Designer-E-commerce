import { createContext, useState, useEffect, useContext } from "react";
import {
  fetchUserProfile,
  updateUserProfile,
  fetchUserOrders,
  fetchFavoriteProducts,
  fetchUserDesigns,
  removeFromFavorites as apiRemoveFromFavorites, // Import the API function
} from "./../utils/api/userProfileApi";
import { removeUserDesign } from "../utils/api/designerApi";

import PropTypes from "prop-types";
import AuthContext from "./AuthContext";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { isLoggedIn, userProfile: authUserProfile } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState(null);
  const [userOrders, setUserOrders] = useState(null);
  const [favoriteProducts, setFavoriteProducts] = useState(null);
  const [designs, setUserDesigns] = useState(null); // Add this line
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // Start loading before fetching
        const [profileData, ordersData, favProductsData, designs] =
          await Promise.all([
            fetchUserProfile(),
            fetchUserOrders(),
            fetchFavoriteProducts(),
            fetchUserDesigns(),
          ]);
        setUserProfile(profileData);
        setUserOrders(ordersData);
        setFavoriteProducts(favProductsData);
        setUserDesigns(designs);
      } catch (error) {
        setError(`Error fetching user data: ${error.message}`);
      } finally {
        setIsLoading(false); // Finish loading
      }
    };

    fetchData(); // Call the fetch function when component mounts
  }, []); // Empty dependency array means it runs once when the component mounts

  useEffect(() => {
    if (isLoggedIn) {
      setIsLoading(true);
    } else {
      setUserProfile(null);
      setUserOrders(null);
      setFavoriteProducts(null);
    }
  }, [isLoggedIn]);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = async (updatedData) => {
    try {
      const updatedProfile = await updateUserProfile(
        userProfile._id,
        updatedData
      );
      setUserProfile(updatedProfile); // Update the local state with the updated profile data
      setIsEditing(false);
    } catch (error) {
      setError(`Error updating user profile: ${error.message}`);
    }
  };

  const removeFromFavorites = async (productId) => {
    try {
      await apiRemoveFromFavorites(productId); // Call the API function to remove the product
      const updatedFavorites = favoriteProducts.filter(product => product._id !== productId);
      setFavoriteProducts([...updatedFavorites]); // Update the state
    } catch (error) {
      setError(`Error removing favorite product: ${error.message}`);
    }
  };

  const removeDesign = async (designId) => {
    try {
      await removeUserDesign(designId); // Call the API function to remove the design
      const updatedDesigns = designs.filter(design => design._id !== designId);
      setUserDesigns([...updatedDesigns]); // Update the state
    } catch (error) {
      setError(`Error removing design: ${error.message}`);
    }
  };

  useEffect(() => {
    // Effect to re-render when userProfile, userOrders, favoriteProducts, or designs change
  }, [userProfile, userOrders, favoriteProducts, designs]);

  return (
    <UserContext.Provider
      value={{
        userProfile,
        userOrders,
        favoriteProducts,
        designs,
        isLoading,
        isEditing,
        error,
        handleEditProfile,
        handleSaveProfile,
        setUserProfile,
        removeFromFavorites, // Add the removeFromFavorites function to the context value
        removeDesign, // Add the removeDesign function to the context value
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserContext;