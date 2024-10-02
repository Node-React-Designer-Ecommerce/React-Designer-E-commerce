import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";

//contexts
import AuthContext from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import UserContext from "../context/UserContext";

// Import the custom link component
import CustomLink from "./CustomLink";

//icons
import ExitIcon from "../icons/ExitIcon";
import CartIcon from "../icons/CartIcon";

export default function Navbar() {
  const { isLoggedIn, logout, userProfile: authUserProfile } = useContext(AuthContext);
  const { userProfile, isLoading } = useContext(UserContext);
  const { totalQuantity, totalPrice } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="navbar bg-base-100 sticky top-0 z-50 border bottom-1 flex justify-between">
      <div className="">
        <Link to="/" className="">
          <img src="/logo.jpeg" width={80} alt="logo" />
        </Link>
      </div>

      <div className="flex space-x-4">
        <CustomLink to="/products">products</CustomLink>
        <CustomLink to="/customize">Customize</CustomLink>
      </div>

      <div className="">
        {isLoggedIn && (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <div className="indicator">
                <CartIcon />
                <span className="badge badge-sm indicator-item">{totalQuantity}</span>
              </div>
            </div>
            <div
              tabIndex={0}
              className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
            >
              <div className="card-body">
                <span className="text-lg font-bold">{totalQuantity} Items</span>
                <span className="text-SecondaryColor">Subtotal: EGP {totalPrice}</span>
                <div className="card-actions">
                  <Link
                    to="/cart"
                    className="btn bg-SecondaryColor hover:bg-SecondaryColor btn-block text-cyan-50"
                  >
                    View cart
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="rounded-2xl">
              <div className={`avatar ${userProfile ? 'online' : ''} placeholder w-10`}>
                <div className="bg-white text-SecondaryColor border border-SecondaryColor w-16 rounded-full">
                  <span className="text-xl">
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-SecondaryColor"></div>
                    ) : userProfile ? (
                      userProfile.name.charAt(0).toUpperCase()
                    ) : (
                      <img src="/usernotfound.jpg" alt="User Not Found" />
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-slate-50 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li className="">
              {isLoggedIn && (
                <a
                  href="/user-profile"
                  className="px-5 py-1 text-SecondaryColor text-xl  hover:transition-all"
                >
                  Profile
                </a>
              )}
            </li>
            <li className="">
              {!isLoggedIn && (
                <Link
                  to="/login"
                  className="px-5 py-1 text-SecondaryColor text-xl  hover:transition-all"
                >
                  Login
                </Link>
              )}
            </li>
            <li className="">
              {!isLoggedIn && (
                <Link
                  to="/sign-up"
                  className="px-5 py-1  text-SecondaryColor text-xl  hover:transition-all"
                >
                  Register
                </Link>
              )}
            </li>
            <li className="">
              {isLoggedIn && (
                <button
                  onClick={handleLogout}
                  className="px-5 py-3 text-xl  text-red-600 rounded-lg hover:transition-all"
                >
                  Logout{" "}
                  <span className="pl-12">
                    <ExitIcon />{" "}
                  </span>
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}