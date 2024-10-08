import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from '../utils/api/productsapi';
import { useToggleFavorite } from "../hooks/useToggleFavorite";
import HeardFilledIcon from '../icons/HeardFilledIcon';
import ArrowRight from "../icons/ArrowRight";
import HeartIcon from '../icons/HeartIcon';
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

// استيراد Carousel
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Skelton from './../layouts/Skelton';

// بيانات الـ Carousel
const properties = [
  { location: "London, UK", price: "$1,213/month", image: "hero.png" },
  { location: "London, UK", price: "$1,213/month", image: "heroo.png" },
  { location: "London, UK", price: "$1,213/month", image: "hero.png" },
  { location: "London, UK", price: "$1,213/month", image: "heroo.png" },
];

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
    <div className="flex flex-col justify-center p-3">
      {/* Carousel Section */}
      <div className="flex flex-col items-center py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Co-Own Spaces Globally</h2>
        <p className="text-lg text-gray-600 mb-6">Check out some of the most in-demand spaces</p>

        <Carousel
          showArrows={true}
          infiniteLoop={true}
          showThumbs={false}
          showStatus={false}
          className="w-full max-w-4xl"
        >
          {properties.map((property, index) => (
            <div key={index} className="p-4">
              <div className="card w-full bg-white shadow-xl">
                <figure>
                  <img src={property.image} alt={property.location} className="object-cover w-full h-60" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{property.location}</h2>
                  <p className="text-gray-700">{property.price}</p>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      {/* Products Section */}
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
