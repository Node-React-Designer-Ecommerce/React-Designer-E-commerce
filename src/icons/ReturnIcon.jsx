import { FaUndo } from "react-icons/fa";

function ReturnIcon() {
  return (
    <>
      <div className="  text-white w-16 h-16 pr-5 rounded-r-3xl relative"  style={{
          background: "linear-gradient(to right, #81B3DC, #CE6ADA)",
        }}>
          <FaUndo className="absolute flex justify-center items-center text-white size-8 top-3 right-3   -left-.5 transition-transform transform hover:rotate-180 duration-500 ease-in-out" />
      </div>
    </>
  );
}

export default ReturnIcon;
