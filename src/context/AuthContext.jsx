import { createContext, useState, useEffect } from "react";
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    const storedToken = Cookies.get('token');
    return storedToken ? JSON.parse(storedToken) : null;
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedLoggedIn = Cookies.get('isLoggedIn');
    return storedLoggedIn ? JSON.parse(storedLoggedIn) : false;
  });

  useEffect(() => {
    if (token) {
      Cookies.set('token', JSON.stringify(token), { expires: 7, secure: true, sameSite: 'strict' });
      Cookies.set('isLoggedIn', JSON.stringify(true), { expires: 7, secure: true, sameSite: 'strict' });
    } else {
      Cookies.remove('token');
      Cookies.remove('isLoggedIn');
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