import axiosInstance from './axiosInstance';

export const fetchUserProfile = async () => {
  try {
    console.log('Fetching User Profile...'); // Debugging
    const response = await axiosInstance.get('/users/me');
    console.log('Fetched User Profile:', response.data.data.user); // Debugging
    return response.data.data.user;
  } catch (error) {
    console.error('Error fetching user profile:', error); // Debugging
    throw error;
  }
};

export const updateUserProfile = async (updatedData) => {
  try {
    // Fetch the user profile to get the id
    const userProfile = await fetchUserProfile();
    const userId = userProfile._id;
    const response = await axiosInstance.patch(`/users/${userId}`, updatedData);
    console.log('Updated User Profile:', response.data);

  } catch (error) {
    console.error('Error updating user profile:', error); // Debugging
    console.error('Server Response:', error.response ? error.response.data : 'No response data'); // Debugging
    throw error;
  }
};

export const fetchUserOrders = async () => {
  try {
    console.log('Fetching User Orders...');
    const response = await axiosInstance.get('/orders/me');
    console.log('Fetched User Orders:', response.data.data.orders);
    return response.data.data.orders;
  } catch (error) {
    console.error('Error fetching user Orders:', error);
    throw error;
  }
};

export const fetchFavoriteProducts = async () => {
  try {
    console.log('Fetching Favorite Products...');
    const response = await axiosInstance.get('/favorite');
    console.log('Fetched Favorite Products:', response.data.data.favProducts);
    return response.data.data.favProducts;
  } catch (error) {
    console.error('Error fetching favorite products:', error);
    throw error;
  }
};