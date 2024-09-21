// Icons
import CarIcon from "../../icons/CarIcon";
import ReturnIcon from "../../icons/ReturnIcon";
import JwellIcon from "../../icons/JwellIcon";
import LikeIcon from "../../icons/LikeIcon";

// text related to icons
import TextCarIcon from "./TextIconSection/TextCarIcon";
import TextReturnIcon from "./TextIconSection/TextReturnIcon";
import TextJwellIcon from "./TextIconSection/TextJwellIcon";
import TextLikeIcon from "./TextIconSection/TextLikeIcon";

function MiniSection() {
  return (
    <div className="flex  font-serif flex-wrap justify-start p-3 items-center w-full py-10 space-y-4 md:space-y-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        <div className="flex items-center w-full md:w-auto">
          <div className="bg-SecondaryColor text-white w-16 h-16  rounded-r-3xl relative">
            <CarIcon></CarIcon>
          </div>
          <div className="pl-5">
            <TextCarIcon></TextCarIcon>
          </div>
        </div>

        <div className="flex items-center w-full md:w-auto">
          <ReturnIcon></ReturnIcon>
          <div className="pl-4">
            <TextReturnIcon></TextReturnIcon>
          </div>
        </div>

        <div className="flex items-center w-full md:w-auto">
          <JwellIcon></JwellIcon>
          <div className="pl-4">
            <TextJwellIcon></TextJwellIcon>
          </div>
        </div>

        <div className="flex items-center w-full md:w-auto">
          <div className="bg-SecondaryColor w-16 h-16 p-4 rounded-r-3xl relative">
            <LikeIcon></LikeIcon>
          </div>
          <div className="pl-4">
            <TextLikeIcon></TextLikeIcon>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MiniSection;
