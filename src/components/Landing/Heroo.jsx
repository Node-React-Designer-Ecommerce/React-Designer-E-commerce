import { Link } from "react-router-dom";

const Heroo = () => {
  return (
    <div className="py-5" >
      <div
        className="relative px-10 flex flex-col md:flex-row md:justify-between justify-center items-center "
        // style={{ background: "#81b3dcab" }}
        style={{ backgroundImage: "linear-gradient(to top, rgb(129 179 220 / 92%), rgb(129 179 220 / 0%))" }}
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
              className="btn border-none text-white"
              style={{
                background: "linear-gradient(to right, #81B3DC, #CE6ADA)",
              }}
            >
              Customize
            </Link>
            <Link to="/products" className="btn btn-outline text-white hover:bg-buttonColor hover:border-none transition duration-700">
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
      <div className="flex justify-center p-3 invisible">
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
