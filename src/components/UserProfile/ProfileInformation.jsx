import { useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import UserContext from '../../context/UserContext';
import Skelton from './../../layouts/Skelton';

export default function ProfileInformation() {
    const { userProfile, isEditing, error, handleEditProfile, handleSaveProfile } = useContext(UserContext);
    console.log(userProfile)
    const [editedProfile, setEditedProfile] = useState({
        name: userProfile?.name || '',
        address: userProfile?.address || '',
        phone: userProfile?.phone || '',
    });
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        setEditedProfile({
            name: userProfile?.name || '',
            address: userProfile?.address || '',
            phone: userProfile?.phone || '',
        });
    }, [userProfile]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    const handleSaveClick = async () => {
        setIsSaving(true);
        try {
            await handleSaveProfile(editedProfile);
            toast.success('Profile updated successfully!');
        } catch (error) {
            console.error('Error saving profile:', error);
            toast.error('Error updating profile. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    if (!userProfile) {
        return <Skelton />;
    }

    return (
        <div className="card bg-white shadow-md rounded-lg p-4 mb-4">
            <div className="card-body p-2">
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1">
                        <h6 className="mb-0">Name</h6>
                    </div>
                    <div className="col-span-2 text-gray-500">
                        {isEditing ? (
                            <input
                                type="text"
                                name="name"
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
                    <div className="col-span-1">
                        <h6 className="mb-0">Phone</h6>
                    </div>
                    <div className="col-span-2 text-gray-500">
                        {isEditing ? (
                            <input
                                type="text"
                                name="phone"
                                value={editedProfile.phone}
                                onChange={handleInputChange}
                                className="border p-1"
                            />
                        ) : (
                            userProfile.phone
                        )}
                    </div>
                </div>

                <hr />
                <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-3">
                        <div className="flex justify-end">
                            {isEditing ? (
                                <button
                                    className="btn bg-buttonColor hover:bg-hoverButton text-white"
                                    onClick={handleSaveClick}
                                    disabled={isSaving}
                                >
                                    {isSaving ? (
                                        <span className="loading loading-ring loading-md"></span>
                                    ) : (
                                        "Save Changes"
                                    )}
                                </button>
                            ) : (
                                <button className="btn bg-buttonColor hover:bg-hoverButton text-white" onClick={handleEditProfile}>
                                    Edit
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}