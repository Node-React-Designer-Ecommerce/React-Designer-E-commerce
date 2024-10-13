import { Link } from "react-router-dom";
function KidsCategorySection() {
  return (
    <div>
      <div className="relative">
        <img src="/kid3.jpg" alt="Kids" className="w-full object-cover" />
        <div className="absolute bottom-4 md:top-4 left-6">
          <Link
            to="/products"
            className="  text-white px-4 py-2 rounded"
            style={{
              background: "linear-gradient(to right, #81B3DC, #CE6ADA)",
            }}
          >
            KIDS
          </Link>
        </div>
      </div>
    </div>
  );
}

export default KidsCategorySection;
