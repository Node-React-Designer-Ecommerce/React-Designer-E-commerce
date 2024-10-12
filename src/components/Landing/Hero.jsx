import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className=" w-full ">
      <div
        className=" w-full h-auto flex justify-between  "
        style={{
          background: "linear-gradient(to right, #81B3DC, #CE6ADA)",
        }}
      >
        <div className="  text-neutral-700  p-4 my-auto">
          <h1 className="text-xl mb-8 md:text-4xl font-bold">
            Show The World Your <br />
            Own Unique Style
          </h1>
          <Link
            to="/customize"
            className=" rounded text-white  hover:bg-purpleColor outline  md:px-4 md:py-4  ms-7"
          >
            Customize it Now
          </Link>
        </div>
        <img
          src="heroo.png"
          alt="New Collection"
          className=" h-auto "
          style={{ width: "700PX" }}
        />
      </div>
    </div>
  );
}

export default Hero;
