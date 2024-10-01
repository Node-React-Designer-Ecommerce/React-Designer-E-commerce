import  { useContext, useState } from 'react';
import UserContext from '../../context/UserContext';

export default function ProfileInformation() {
  const { userProfile, isEditing, error, handleEditProfile, handleSaveProfile } = useContext(UserContext);
  const [editedProfile, setEditedProfile] = useState({
    fullName: userProfile?.fullName || '',
    email: userProfile?.email || '',
    address: userProfile?.address || '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSaveClick = () => {
    handleSaveProfile(editedProfile);
  };

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="card-body">
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1">
            <h6 className="mb-0">Full Name</h6>
          </div>
          <div className="col-span-2 text-gray-500">
            {isEditing ? (
              <input
                type="text"
                name="fullName"
                value={editedProfile.name}
                onChange={handleInputChange}
                className="border p-1"
              />
            ) : (
              userProfile.name
            )}
          </div>
        </div>
        <hr />
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1">
            <h6 className="mb-0">Email</h6>
          </div>
          <div className="col-span-2 text-gray-500">
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={editedProfile.email}
                onChange={handleInputChange}
                className="border p-1"
              />
            ) : (
              userProfile.email
            )}
          </div>
        </div>
        <hr />
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1">
            <h6 className="mb-0">Address</h6>
          </div>
          <div className="col-span-2 text-gray-500">
            {isEditing ? (
              <input
                type="text"
                name="address"
                value={editedProfile.address}
                onChange={handleInputChange}
                className="border p-1"
              />
            ) : (
              userProfile.address
            )}
          </div>
        </div>
        <hr />
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-3">
            {isEditing ? (
              <button className="btn btn-info" onClick={handleSaveClick}>
                Save Changes
              </button>
            ) : (
              <button className="btn btn-info" onClick={handleEditProfile}>
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}