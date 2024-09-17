import { FaGem } from "react-icons/fa";

function JwellIcon() {
  return (
    <>
      <div className="bg-SecondaryColor text-white w-16 h-16 p-4 rounded-r-3xl relative">
      <FaGem className="absolute text-white text-[44px] top-2 right-0.5 hover:animate-bounce 
    transition-transform transform hover:scale-150 duration-300 ease-in-out" />


      </div>
    </>
  );
}

export default JwellIcon;
