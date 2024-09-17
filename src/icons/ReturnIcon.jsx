import { FaUndo } from "react-icons/fa";

function ReturnIcon() {
  return (
    <>
    <div className="bg-SecondaryColor w-16 h-16 pr-5 rounded-r-3xl relative">
    <FaUndo className="absolute size-7 top-2 right-0.5 -left-.5" />
  </div>
    </>
  )
}

export default ReturnIcon