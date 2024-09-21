import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className=" w-full h-screen">
      <div className="relative w-full h-screen">
        <img
          src="/coverproduct.jpg"
          alt="New Collection"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-1/4 left-5 right-5 md:left-10 text-neutral-950 p-4">
          <h1 className="text-3xl mb-8 md:text-6xl font-bold">
            Show The World Your <br />
            Own Unique Style
          </h1>
          <Link to="/customize" className="bg-SecondaryColor  px-4 py-2 text-white  mt-28   md:px-4 md:py-2  ms-7">
            Customize it Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
