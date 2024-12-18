import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../utils/api/productsapi";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Skelton from "./../layouts/Skelton";
import "../styles/CarouselCustom.css";
import { Link } from "react-router-dom";

// Utility function to group products into chunks of 3
const chunkProducts = (products, chunkSize) => {
  const chunks = [];
  for (let i = 0; i < products.length; i += chunkSize) {
    chunks.push(products.slice(i, i + chunkSize));
  }
  return chunks;
};

function LandingProductItem() {
  const { isLoading, data: products } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
    cacheTime: 50000,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-8">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="card bg-base-100 w-80 shadow-xl">
              <div className="flex justify-center">
                <Skelton />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Group products into chunks of 3
  const productChunks = chunkProducts(products, 3);

  return (
    <div className="flex flex-col justify-center w-full">
      <div className="flex flex-col items-center py-6 w-full">
        <Carousel
          showArrows={true}
          infiniteLoop={true}
          showThumbs={false}
          showStatus={false}
          autoPlay={true}
          interval={3000}
          stopOnHover={true}
          className="custom-carousel w-full"
          // Custom Previous Arrow
          renderArrowPrev={(onClickHandler, hasPrev, label) =>
            hasPrev && (
              <button
                type="button"
                onClick={onClickHandler}
                className="absolute left-0 z-10 p-2  text-white bg-textColor rounded-full ms-44 lg:flex hidden"
                style={{ top: "50%", transform: "translateY(-50%)" }}
              >
                &#10094; {/* Unicode for left arrow */}
              </button>
            )
          }
          // Custom Next Arrow
          renderArrowNext={(onClickHandler, hasNext, label) =>
            hasNext && (
              <button
                type="button"
                onClick={onClickHandler}
                className="absolute right-0 z-10 p-2  text-white bg-textColor rounded-full  me-44 lg:flex hidden"
                style={{ top: "50%", transform: "translateY(-50%)" }}
              >
                &#10095; {/* Unicode for right arrow */}
              </button>
            )
          }
        >
          {productChunks?.map((chunk, index) => (
            <div
              key={index}
              className="flex flex-wrap justify-center mx-auto gap-4 mb-5 mt-5 "
              style={{ maxWidth: "1200px" }}
            >
              {chunk.map((product) => (
                <div
                  key={product._id}
                  className="card w-72 h-auto bg-white shadow-lg mx-2 p-5 mb-8  "
                >
                  <figure>
                    <Link to={`/product-details/${product._id}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-[349px] object-cover rounded-xl"
                      />
                    </Link>
                  </figure>

                  {/* <div className="card-body">
                    <h2 className="card-title text-center">{product.name}</h2>
                    <p className="text-lg font-semibold text-center">${product.price}</p>
                  </div> */}
                </div>
              ))}
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default LandingProductItem;
