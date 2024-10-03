//import { Link } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getIsDesignableProduct } from "../../utils/api/productsapi";
import Skelton from "../../layouts/Skelton";

export default function CardOfDesigner() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["isDesignableProducts"],
    queryFn: getIsDesignableProduct,
    cacheTime: 50000,
  });
  console.log(data);

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-2 gap-8">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="card bg-base-100 w-80 shadow-xl">
              <Skelton />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>; // Display error message
  }

  const products = data || []; // Ensure products is an array
  console.log(products);
  return (
    <div className="mt-32">
      <div className="mb-5 font-bold text-4xl text-purpleColor text-center">
        Choose your piece
      </div>
      <div className="font-serif flex justify-center">
        <div className="flex justify-center">
          <div className="grid grid-cols-1 xl:grid-cols-3  md:grid-cols-2 gap-5">
            {products.map((product) => (
              <div
                key={product._id}
                className="card bg-base-100 w-80 shadow-xl rounded-lg"
              >
                <figure className="px-5 relative pt-10">
                  <img src={product.image} alt="Shoes" className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title uppercase">{product.name}</h2>

                  <p className="text-green-800">EGP {product.price}</p>
                  <Link
                    to={`/designer/${product._id}`}
                    className="flex justify-between  w-44 bg-mintColor text-white rounded cursor-pointer hover:bg-gray-700 transition duration-300 ease-in-out text-center p-2 ps-3 text-center "
                  >
                    Custome your design
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
