import { useContext, useState } from "react";
import UserContext from "../../context/UserContext";
import { Link } from "react-router-dom";
import Skelton from "../../layouts/Skelton";
import DeleteIcon from "../../icons/DeleteIcon"; // Assuming you have a DeleteIcon component

export default function ProfileDesigns() {
  const [showModal, setShowModal] = useState(false);
  const [designToDelete, setDesignToDelete] = useState(null);
  const { designs, removeDesign } = useContext(UserContext);

  const handleDeleteConfirm = (id) => {
    setDesignToDelete(id);
    setShowModal(true);
  }

  const handleDeleteCancel = () => {
    setDesignToDelete(null);
    setShowModal(false);
  }

  const handleDeleteConfirmed = () => {
    if (designToDelete) {
      removeDesign(designToDelete)
    }
    setDesignToDelete(null);
    setShowModal(false);
  }

  if (!designs) {
    return <Skelton />;
  }

  return (
    <div className="flex justify-center p-3 mx-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-10">
        {designs.length === 0 ? (
          <div className="w-full flex justify-center items-center col-span-3">
            <img src="/noFav.png" className="w-1/4" alt="No Designs" />
          </div>
        ) : (
          designs.map((design) => (
            <div
              key={design._id}
              className="rounded-lg bg-base-100 shadow-xl w-full sm:w-80"
            >
              <figure className="relative pt-5">
                <div
                  className="bg-lightBackGround text-white rounded-3xl w-11 absolute top-9 start-4 h-11 flex justify-center items-center cursor-pointer"
                  onClick={() => handleDeleteConfirm(design._id)}
                >
                  <DeleteIcon />
                </div>
                <img
                  src={design.image[0]}
                  alt="Design"
                  className="rounded-2xl p-2.5 h-[349px] w-full object-cover"
                />
              </figure>
              <div className="p-4 items-center gap-1 text-center">
                <div className="flex justify-between">
                  <h2 className="text-[17px] font-bold uppercase">
                    {design.name}
                  </h2>
                  <p className="text-xl font-bold text-mintColor">
                    EGP {design.totalPrice}
                  </p>
                </div>
                <p className="text-gray-500 py-2 capitalize text-nowrap truncate">
                  {design.description}
                </p>
                <div className="flex justify-center pt-1 w-full">
                  <Link
                    to={`/designer/${design.productId}?edit=${design._id}`}
                    className="btn w-full rounded text-white bg-buttonColor hover:bg-hoverButton text-lg flex items-center"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Confirm Delete</h3>
            <p className="py-4">Are you sure you want to delete this design?</p>
            <div className="modal-action">
              <button
                onClick={handleDeleteConfirmed}
                className="btn border border-red-500 bg-white hover:bg-red-500 hover:text-white duration-300 "
              >
                Delete
              </button>
              <button onClick={handleDeleteCancel} className="btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
