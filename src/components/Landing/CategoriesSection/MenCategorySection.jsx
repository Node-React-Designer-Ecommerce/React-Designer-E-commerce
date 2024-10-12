import { Link } from "react-router-dom";
function MenCategorySection() {
  return (
    <div>
      <div className="relative">
        <img
          src="/men3.avif"
          alt="Men"
          className="w-full h-auto object-contain"
        />
        <div className="absolute bottom-4 left-4">
          <Link
            to="/products"
            className="  text-white  px-4 py-2 rounded"
            style={{
              background: "linear-gradient(to right, #81B3DC, #CE6ADA)",
            }}
          >
            MEN
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MenCategorySection;
