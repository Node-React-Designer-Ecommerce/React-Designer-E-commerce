import ProfileCard from "../components/UserProfile/ProfileCard";
import ProfileDesigns from "../components/UserProfile/ProfileDesigns";
import ProfileFav from "../components/UserProfile/ProfileFav";
import ProfileInformation from "../components/UserProfile/ProfileInformation";
import ProfileOrders from "../components/UserProfile/ProfileOrders";

const UserProfile = () => {
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
        <div className="flex flex-col gap-3">
          <ProfileOrders />
          <ProfileFav />
          <ProfileDesigns />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
