import { useContext } from "react";
import { useQuery } from '@tanstack/react-query';
import ProfileCard from "../components/UserProfile/ProfileCard";
import ProfileInformation from "../components/UserProfile/ProfileInformation";
import UserTabs from "../components/UserProfile/UserTabs";
import UserContext from "../context/UserContext";

const UserProfile = () => {
  const { fetchData } = useContext(UserContext);

  // Use React Query to fetch and cache the user data
  const { data, isLoading, error } = useQuery({
    queryKey: ['userData'],
    queryFn: async () => {
      try {
        const result = await fetchData();
        if (!result) {
          throw new Error("No data returned from fetchData");
        }
        return result; // Ensure fetchData returns the data
      } catch (err) {
        console.error("Error fetching user data:", err);
        throw err; // Rethrow the error to be handled by React Query
      }
    },
    cacheTime: 1000, // Cache time in milliseconds
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span>Error fetching user data: {error.message}</span>
      </div>
    );
  }

  const { userProfile, userOrders, favoriteProducts, designs } = data;

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