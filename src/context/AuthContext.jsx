import { createContext, useState, useEffect } from "react";
import PropTypes from 'prop-types';

// Create AuthContext
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem('token');
    return storedToken ? JSON.parse(storedToken) : null;
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedLoggedIn = localStorage.getItem('isLoggedIn');
    return storedLoggedIn ? JSON.parse(storedLoggedIn) : false;
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', JSON.stringify(token));
      localStorage.setItem('isLoggedIn', JSON.stringify(true));
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('isLoggedIn');
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
    <AuthContext.Provider value={{ token, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;