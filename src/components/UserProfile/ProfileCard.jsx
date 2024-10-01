import { useContext } from "react";
import UserContext from "../../context/UserContext";

export default function ProfileCard() {
  const { userProfile } = useContext(UserContext);

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card bg-white shadow-md rounded-lg p-4">
      <div className="flex flex-col items-center text-center">
        {/* Use the user's profile picture if available */}
        {userProfile.profilePicture ? (
          <img
            src={userProfile.profilePicture}
            alt="User Profile"
            className="w-64 h-64 rounded-full object-cover"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-SecondaryColor flex items-center justify-center">
            <span className="text-white  text-4xl">
              {userProfile.name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <div className="mt-9">
          <h4 className="text-xl font-semibold">{userProfile.fullName}</h4>
          <p className="text-gray-500">{userProfile.email}</p>
          <p className="text-gray-500">{userProfile.address}</p>
        </div>
      </div>
    </div>
  );
}