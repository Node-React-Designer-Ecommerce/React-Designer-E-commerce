import { Link } from "react-router-dom";

const Heroo = () => {
  return (
    <div className="p-5" style={{ background: "#81B3DC" }}>

      <div
        className="relative flex flex-col md:flex-row md:justify-between justify-center items-center "
        style={{ background: "#81B3DC" }}
      >

        {/* Left Section */}
        <div className="flex flex-col space-y-4 max-w-lg text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold">
            Crafting a new age of{" "}
            <span className="text-white">fashion</span>
          </h1>
          <p className="text-base md:text-lg text-gray-800">
            Discover the Latest Trends, Timeless Classics, and Ultimate Comfort.
          </p>
          <div className="flex gap-3 items-center justify-center md:justify-start">
            <Link
              to="/customize"
              className="btn text-white"
              style={{
                background: "linear-gradient(to right, #81B3DC, #CE6ADA)",
              }}
            >
              Customize
            </Link>
            <Link to="/products" className="btn btn-outline text-white ">
              Products
            </Link>
          </div>
        </div>

        {/* Right Section with Image */}
        <div className="relative mt-6 md:mt-0 w-full md:w-auto">
          <img
            src="landing22.png"
            alt="Fashion Model"
            className="w-full md:w-auto h-auto object-cover"
          />
        </div>

      </div>
      {/* Start Shopping Button */}
      <div className="flex justify-center p-3">
        <Link
          href="/products"
          className="btn btn-lg text-white"
          style={{
            background: "linear-gradient(to right, #81B3DC, #CE6ADA)",
          }}
        >
          Start Shopping <span className="ml-2">➔</span>
        </Link>
      </div>

    </div>
  );
};

export default Heroo;
