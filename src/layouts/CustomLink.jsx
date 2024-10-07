import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

function CustomLink({ to, children }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <div className="relative group">
      <Link
        to={to}
        className={`px-5 py-1 text-textColor font-bold text-xl hover:transition-all ${
          isActive ? "active" : ""
        }`}
      >
        {children}
      </Link>
      <div
        className={`bg-buttonColor w-full h-[3px] rounded-xl transform transition-transform duration-500 ${
          isActive ? "scale-x-100" : "scale-x-0"
        }`}
      ></div>
    </div>
  );
}

CustomLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default CustomLink;
