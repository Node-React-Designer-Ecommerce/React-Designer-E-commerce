import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="w-full">
      <div
        className="w-full h-auto flex flex-col md:flex-row justify-between items-center p-4"
        style={{
          background: "linear-gradient(to right, #81B3DC, #CE6ADA)",
        }}
      >
        {/* Text Section */}
        <div className="text-neutral-700 p-4 my-auto text-center md:text-left">
          <h1 className="text-md sm:text-xl mb-4 md:text-2xl lg:text-2xl font-bold">
            Show The World Your <br />
            Own Unique Style
          </h1>
          <Link
            to="/customize"
            className="rounded bg-purple-500 text-white px-4 py-2 md:px-6 md:py-3 hover:bg-purple-600 transition ms-0 md:ms-7"
          >
            Customize it Now
          </Link>
        </div>

        {/* Image Section */}
        <img
          src="heroo.png"
          alt="New Collection"
          className="w-full h-auto max-w-md md:max-w-lg object-cover mt-6 md:mt-0"
        />
      </div>
    </div>
  );
}

export default Hero;
