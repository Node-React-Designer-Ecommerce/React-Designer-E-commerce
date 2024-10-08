import { FaGem } from "react-icons/fa";

function JwellIcon() {
  return (
    <>
      <div className="  text-white w-16 h-16 p-4 rounded-r-3xl " style={{ background: 'linear-gradient(#73C3A0, #DC8DEA)' }}>
        <FaGem
          className=" text-white text-[30px] flex justify-center items-center  hover:animate-bounce 
    transition-transform transform hover:scale-150 duration-300 ease-in-out"
        />
      </div>
    </>
  );
}

export default JwellIcon;
