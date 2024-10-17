import  { useEffect, useState, useContext } from "react";
import ProfileCard from "../components/UserProfile/ProfileCard";
import ProfileInformation from "../components/UserProfile/ProfileInformation";
import UserTabs from "../components/UserProfile/UserTabs";
import UserContext from "../context/UserContext";

const UserProfile = () => {
  const { fetchData, userProfile, userOrders, favoriteProducts, designs } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        await fetchData();
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [fetchData]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

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
        <UserTabs
          userProfile={userProfile}
          userOrders={userOrders}
          favoriteProducts={favoriteProducts}
          designs={designs}
        />
        <div className="flex flex-col gap-3">
        </div>
      </div>
    </div>
  );
};

export default UserProfile;