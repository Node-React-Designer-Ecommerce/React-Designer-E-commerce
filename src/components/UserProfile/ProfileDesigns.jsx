import { useContext } from "react";
import UserContext from "../../context/UserContext";
import Skelton from "../../layouts/Skelton";
import { Link } from "react-router-dom";

export default function ProfileDesigns() {
  const { designs } = useContext(UserContext);
  if (!designs) {
    return <Skelton />;
  }
  console.log(designs);
  return (
    <div className="col-span-2">
      <div className="card h-full bg-mintColor text-white shadow-md rounded-lg p-4">
        <div className="card-body">
          <h6 className="flex items-center mb-3 text-xl font-bold">
            My Designs
          </h6>
          {designs && designs.length > 0 ? (
            <div className="flex flex-wrap justify-between md:justify-center">
              {" "}
              {designs.map((design) => (
                <div
                  key={design._id}
                  className="card bg-base-100 w-80 shadow-xl rounded-lg m-5"
                >
                  <figure className="px-5 relative pt-10">
                    <img
                      src={design.image}
                      alt="Shoes"
                      className="rounded-xl"
                    />
                  </figure>
                  <div className="card-body items-center text-center">
                    <h2 className="card-title uppercase">{design.name}</h2>

                    <p className="text-mintColor text-xl">
                      EGP {design.totalPrice}
                    </p>
                    <Link
                      to={`/designer/${design.productId}?edit=${design._id}`}
                      className="flex justify-between  w-20 bg-purpleColor text-white rounded cursor-pointer hover:bg-mintColor transition duration-300 ease-in-out text-center p-2 ps-6 text-center "
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center">
              <img src="/noFav.png" className="w-1/4" alt="" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
