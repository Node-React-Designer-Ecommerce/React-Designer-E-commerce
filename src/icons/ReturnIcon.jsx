import { FaUndo } from "react-icons/fa";

function ReturnIcon() {
  return (
    <>
      <div className="bg-SecondaryColor  text-white w-16 h-16 pr-5 rounded-r-3xl relative">
          <FaUndo className="absolute text-white size-11 top-2 right-0.5 -left-.5 transition-transform transform hover:rotate-180 duration-500 ease-in-out" />
      </div>
    </>
  );
}

export default ReturnIcon;
