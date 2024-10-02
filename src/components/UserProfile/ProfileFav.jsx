import { useContext } from "react";
import UserContext from "../../context/UserContext";
import { Link } from "react-router-dom";
import Skelton from "../../layouts/Skelton";

export default function ProfileFav() {
    const { favoriteProducts } = useContext(UserContext);

    if (!favoriteProducts) {
        return <Skelton />;
    }

    return (
        <div className="col-span-2">
            <div className="card h-full bg-SecondaryColor text-white shadow-md rounded-lg p-4">
                <div className="card-body">
                    <h6 className="flex items-center mb-3 text-xl font-bold">
                        My Favorites
                    </h6>
                    {favoriteProducts && favoriteProducts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {favoriteProducts.map((product) => (
                                <div key={product._id} className="card bg-base-100 shadow-xl">
                                    <div className="card-body py-3 flex flex-row justify-between">
                                        <h2 className="card-title text-xl text-black">{product.name}</h2>
                                        <Link to={`/product-details/${product._id}`} className="btn btn-sm text-white btn-success mt-2">
                                            View Details
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