import { useEffect } from "react";
import ProfileCard from "../components/UserProfile/ProfileCard";
import ProfileInformation from "../components/UserProfile/ProfileInformation";
import UserTabs from "../components/UserProfile/UserTabs";

const UserProfile = () => {
  useEffect(()=> {

  },[])
  return (
    <div className="container mx-auto p-4">
      <div className="main-body lg:mx-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Profile Card */}
          <div className="col-span-1">
            <ProfileCard />
          </div>

          {/* User Details Card */}
          <div className="col-span-2">
            <ProfileInformation />
          </div>
        </div>
        {/* Profile Orders and Favorites */}
        <UserTabs/>
        <div className="flex flex-col gap-3">
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
