import { createContext, useState, useEffect } from 'react';
import { fetchUserProfile, updateUserProfile, fetchUserOrders } from './../utils/api/userProfileApi';

//prop types
import PropTypes from 'prop-types';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [userOrders, setUserOrders] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        console.log('Fetching User Profile...'); // Debugging
        const profileData = await fetchUserProfile();
        console.log('Fetched User Profile Data:', profileData); // Debugging
        setUserProfile(profileData);
      } catch (error) {
        console.error('Error fetching user profile:', error); // Debugging
        setError(`Error fetching user profile: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    const getUserOrders = async () => {
      try {
        console.log('Fetching User Orders...'); // Debugging
        const OrdersData = await fetchUserOrders();
        console.log('Fetched User  Orders:', OrdersData); // Debugging
        setUserOrders(OrdersData);
      } catch (error) {
        console.error('Error fetching user Orders:', error); // Debugging
        setError(`Error fetching user Orders: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    getUserProfile();
    getUserOrders();
  }, []);

  const handleEditProfile = () => {
    console.log('Editing Profile...'); // Debugging
    setIsEditing(true);
  };

  const handleSaveProfile = async (updatedData) => {
    try {
      console.log('Saving Profile...', updatedData); // Debugging
      const updatedProfile = await updateUserProfile(updatedData);
      console.log('Updated Profile Data:', updatedProfile); // Debugging
      setUserProfile(updatedProfile);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user profile:', error); // Debugging
      setError(`Error updating user profile: ${error.message}`);
    }
  };

  return (
    <UserContext.Provider value={{ userProfile, userOrders, isLoading, isEditing, error, handleEditProfile, handleSaveProfile, setUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
  isAuth: PropTypes.bool,
};

export default UserContext;