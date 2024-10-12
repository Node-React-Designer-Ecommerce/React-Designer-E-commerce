const Heroo = () => {
  return (
    <div className="relative flex justify-between items-center pt-11  p-10 h-[500px] overflow-hidden" style={{background: "#81B3DC"}}>
      {/* Left Section */}
      <div className="flex flex-col space-y-4 max-w-lg">
        <h1 className="text-5xl font-bold">
          Crafting a new age of{" "}
          <span className="text-white">fashion</span>
        </h1>
        <p className="text-lg text-gray-800">
          Discover the Latest Trends, Timeless Classics, and Ultimate Comfort.
        </p>
        <div className="flex space-x-4">
          <a  href="/customize"
            className="btn text-white"
            style={{
              background: "linear-gradient(to right, #81B3DC, #CE6ADA)",
            }}
          >
            Customize
          </a>
          <a href="/products" className="btn btn-outline text-white">Products</a>
        </div>
      </div>

      {/* Right Section with Image */}
      <div className="relative">
        <img
          src="2.png"
          alt="Fashion Model"
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Start Shopping Button */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
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
