import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import CustomLink from "./CustomLink"; // Import the custom link component

//icons
import ExitIcon from "../icons/ExitIcon";
import CartIcon from "../icons/CartIcon";

export default function Navbar() {
  const { isLoggedIn, logout } = useContext(AuthContext);
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
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <CartIcon />
              <span className="badge badge-sm indicator-item">8</span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
          >
            <div className="card-body">
              <span className="text-lg font-bold">8 Items</span>
              <span className="text-SecondaryColor">Subtotal: $999</span>
              <div className="card-actions">
                <button className="btn bg-SecondaryColor hover:bg-SecondaryColor btn-block text-cyan-50">
                  View cart
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-slate-50 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
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
