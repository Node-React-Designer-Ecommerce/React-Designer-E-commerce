// import { useProducts } from "../context/ProductsContext";
import ArrowRight from "../icons/ArrowRight";
import { Link } from "react-router-dom";
import HeardFilledIcon from '../icons/HeardFilledIcon';
import HeartIcon from '../icons/HeartIcon';
import ShoppingBag from '../icons/ShoppingBag';
import Skelton from './Skelton';
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from '../utils/api/productsapi'
import { useToggleFavorite } from '../utils/helpers/help';

function LandingProductItem() {
  // const { products, loading, toggleFavorite, favoriteProducts } = useProducts();
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
        <div className="grid grid-cols-1 lg:grid lg:grid-cols-4 md:grid md:grid-cols-2 gap-5">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="card bg-base-100 w-80 shadow-xl">
              <Skelton />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {products.slice(0, 3).map((product) => (
            <div key={product._id} className="card bg-base-100 w-80 shadow-xl">
              <figure className="px-5 relative pt-10">
                <div
                  className="bg-white rounded-3xl w-11 absolute top-12 start-7 h-11 flex justify-center items-center cursor-pointer"
                  onClick={() => toggleFavorite(product._id)}
                >
                  {favoriteProducts[product._id] ? <HeardFilledIcon /> : <HeartIcon />}
                </div>
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
                  <Link className="bg-SecondaryColor hover:bg-green-900 transition duration-700 ease-in-out rounded-3xl w-11 h-11 flex justify-center items-center cursor-pointer">
                    <ShoppingBag />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LandingProductItem;