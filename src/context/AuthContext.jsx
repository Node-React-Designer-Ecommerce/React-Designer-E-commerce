import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import axiosInstance from "../utils/api/axiosInstance";

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

  const login = (token) => {
    setToken(token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setToken(null);
    setIsLoggedIn(false);
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