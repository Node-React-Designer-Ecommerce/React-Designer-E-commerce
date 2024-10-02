import { createContext, useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import axiosInstance from "../utils/api/axiosInstance";
import { fetchUserProfile , fetchUserOrders } from "../utils/api/userProfileApi";
import UserContext from "./UserContext";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    const storedToken = Cookies.get("token");
    return storedToken || null; // No need to parse since it's stored as a string
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedLoggedIn = Cookies.get("isLoggedIn");
    return storedLoggedIn ? JSON.parse(storedLoggedIn) : false;
  });

  const [userId, setUserId] = useState(null);

  const { setUserProfile  , setUserOrders} = useContext(UserContext);

  useEffect(() => {
    if (token) {
      Cookies.set("token", token, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      }); // Store token directly
      Cookies.set("isLoggedIn", JSON.stringify(true), {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });
      const fetchUserData = async () => {
        try {
          const response = await axiosInstance.get("/users/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setUserId(response?.data?.data?.user?._id);
          fetchUserProfileData();
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    } else {
      Cookies.remove("token");
      Cookies.remove("isLoggedIn");
    }
  }, [token]);

  const fetchUserProfileData = async () => {
    try {
      const profileData = await fetchUserProfile();
      setUserProfile(profileData);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const fetchUserOrdersData = async () => {
    try {
      const ordersData = await fetchUserOrders();
      setUserOrders(ordersData);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const login = (token) => {
    setToken(token);
    setIsLoggedIn(true);
    fetchUserProfileData();
    fetchUserOrdersData();
  };

  const logout = () => {
    setToken(null);
    setIsLoggedIn(false);
    setUserProfile(null);
    setUserOrders(null)
  };

  return (
    <AuthContext.Provider value={{ token, isLoggedIn, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;