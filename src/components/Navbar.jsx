import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function Navbar() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="">
      <div className="navbar bg-base-100 border-b-2">
        <div className="flex-1">
          <Link to="/" className="">
            <img src="smm.png" width={150} alt="logo" />
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <Link
              to="/products"
              className="px-5 py-1 font-bold text-sky-500 text-xl  hover:text-sky-400 hover:transition-all"
            >
              products
            </Link>
            {!isLoggedIn && (
              <Link
                to="/login"
                className="px-5 py-1 font-bold text-sky-500 text-xl  hover:text-sky-400 hover:transition-all"
              >
                Login
              </Link>
            )}
            {!isLoggedIn && (
              <Link
                to="/sign-up"
                className="px-5 py-1 font-bold text-sky-500 text-xl  hover:text-sky-400 hover:transition-all"
              >
                Register
              </Link>
            )}
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="px-5 py-3 text-lg bg-red-600 text-white rounded-lg font-bold hover:bg-red-500 hover:transition-all"
              >
                Logout
              </button>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
