const Heroo = () => {
  return (
    <div
      className="relative flex flex-col md:flex-row justify-between items-center pt-11 p-6 md:p-10 h-auto md:h-[500px] overflow-hidden"
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
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0 items-center justify-center md:justify-start">
          <a
            href="/customize"
            className="btn text-white"
            style={{
              background: "linear-gradient(to right, #81B3DC, #CE6ADA)",
            }}
          >
            Customize
          </a>
          <a href="/products" className="btn btn-outline text-white ">
            Products
          </a>
        </div>
      </div>

      {/* Right Section with Image */}
      <div className="relative mt-6 md:mt-0 w-full md:w-auto">
        <img
          src="2.png"
          alt="Fashion Model"
          className="w-full md:w-auto h-auto object-cover"
        />
      </div>

      {/* Start Shopping Button */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 md:bottom-6">
        <a
          href="/products"
          className="btn btn-lg text-white"
          style={{
            background: "linear-gradient(to right, #81B3DC, #CE6ADA)",
          }}
        >
          Start Shopping <span className="ml-2">➔</span>
        </a>
      </div>
    </div>
  );
};

export default Heroo;
