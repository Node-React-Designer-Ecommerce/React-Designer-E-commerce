import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext'; // Default import
import PropTypes from 'prop-types';

export default function ProtectedRoute({ children, isAuth = true }) {
  const { isLoggedIn } = useContext(AuthContext);

  if (isAuth && !isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (!isAuth && isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  isAuth: PropTypes.bool,
};