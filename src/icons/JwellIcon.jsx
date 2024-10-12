import { FaGem } from "react-icons/fa";

function JwellIcon() {
  return (
    <>
      <div
        className="  text-white w-16 h-16 p-4 rounded-r-3xl "
        style={{
          background: "linear-gradient(to right, #81B3DC, #CE6ADA)",
        }}
      >
        <FaGem
          className=" text-white text-[30px] flex justify-center items-center  hover:animate-bounce 
    transition-transform transform hover:scale-150 duration-300 ease-in-out"
        />
      </div>
    </>
  );
}

export default JwellIcon;
