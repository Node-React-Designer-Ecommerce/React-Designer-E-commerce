import { createContext, useState, useEffect, useContext } from 'react';
import { fetchUserProfile, updateUserProfile, fetchUserOrders, fetchFavoriteProducts } from './../utils/api/userProfileApi';
import PropTypes from 'prop-types';
import AuthContext from './AuthContext';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { isLoggedIn, userProfile: authUserProfile } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState(null);
  const [userOrders, setUserOrders] = useState(null);
  const [favoriteProducts, setFavoriteProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const [profileData, ordersData, favProductsData] = await Promise.all([
        fetchUserProfile(),
        fetchUserOrders(),
        fetchFavoriteProducts(),
      ]);
      setUserProfile(profileData);
      setUserOrders(ordersData);
      setFavoriteProducts(favProductsData);
    } catch (error) {
      setError(`Error fetching user data: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchData();
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
      const updatedProfile = await updateUserProfile(userProfile._id, updatedData);
      setUserProfile(updatedProfile);
      setIsEditing(false);
      fetchData(); // Re-fetch data after updating profile
    } catch (error) {
      setError(`Error updating user profile: ${error.message}`);
    }
  };

  return (
    <UserContext.Provider value={{ userProfile, userOrders, favoriteProducts, isLoading, isEditing, error, handleEditProfile, handleSaveProfile, setUserProfile, fetchData }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserContext;