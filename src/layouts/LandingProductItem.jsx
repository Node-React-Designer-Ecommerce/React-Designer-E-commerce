import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from '../utils/api/productsapi';
import { useToggleFavorite } from "../hooks/useToggleFavorite";
import Skelton from './Skelton';
import HeardFilledIcon from '../icons/HeardFilledIcon';
import ArrowRight from "../icons/ArrowRight";
import HeartIcon from '../icons/HeartIcon';
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

function LandingProductItem() {
  const { isLoggedIn } = useContext(AuthContext);

  const { isLoading, data } = useQuery(
    {
      queryKey: ['products'],
      queryFn: getAllProducts,
      cacheTime: 50000,
    }
  );

  const products = data ? data : [];
  const { favoriteProducts, toggleFavorite } = useToggleFavorite();

  if (isLoading) {
    return (
      <div className="flex justify-center">
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

  return (
    <div className="flex justify-center p-3">
      <div className="w-11/12 gap-5 relative flex justify-center">
        <div className=" md:pt-16 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {products.slice(0, 3).map((product) => (
              <div key={product._id} className="card bg-base-100 w-80 shadow-xl">
                <figure className="px-5 relative pt-10">
                  {isLoggedIn && (
                    <div
                      className="bg-white rounded-3xl w-11 absolute top-12 start-7 h-11 flex justify-center items-center cursor-pointer"
                      onClick={() => toggleFavorite(product._id)}
                    >
                      {favoriteProducts && favoriteProducts[product._id] ? <HeardFilledIcon /> : <HeartIcon />}
                    </div>
                  )}
                  <img src={product.image} alt="#" className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title uppercase">{product.name}</h2>
                  <p>{product.description}</p>
                  <p className="text-green-800">${product.price}</p>
                  <div className="flex justify-between pt-4 w-full">
                    <Link to={`/product-details/${product._id}`} className="flex items-center">
                      See More <ArrowRight />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingProductItem;