import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import UserContext from '../../context/UserContext';
import Skelton from './../../layouts/Skelton';

export default function ProfileInformation() {
    const { userProfile, isEditing, error, handleEditProfile, handleSaveProfile } = useContext(UserContext);
    const [showModal, setShowModal] = useState(false);
    const [editedProfile, setEditedProfile] = useState({
        name: userProfile?.name || '',
        address: userProfile?.address || '',
        phone: userProfile?.phone || '',
    });
    const [isSaving, setIsSaving] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    const handleSaveClick = (e) => {
        e.preventDefault();
        setShowModal(true); 
    };

    const handleEditConfirm = async () => {
        setIsSaving(true);
        try {
            await handleSaveProfile(editedProfile);
            toast.success('Profile updated successfully!');
            // window.location.reload(); 
        } catch (error) {
            console.error('Error saving profile:', error);
            toast.error('Error updating profile. Please try again.');
        } finally {
            setIsSaving(false);
            setShowModal(false); 
        }
    };

    const handleEditCancel = () => {
        setShowModal(false);
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

            {/* Modal for confirmation */}
            {showModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-lg font-semibold mb-4">Confirm Changes</h3>
                        <p>Are you sure you want to save these changes?</p>
                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                className="btn bg-buttonColor hover:bg-hoverButton text-white"
                                onClick={handleEditConfirm}
                                disabled={isSaving}
                            >
                                {isSaving ? <span className="loading loading-ring loading-md"></span> : 'Confirm'}
                            </button>
                            <button
                                className="btn btn-outline text-gray-500 hover:bg-gray-700 mr-2"
                                onClick={handleEditCancel}
                                disabled={isSaving}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
