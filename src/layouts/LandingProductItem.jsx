import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from '../utils/api/productsapi';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Skelton from './../layouts/Skelton';
import '../styles/CarouselCustom.css'; 

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
    queryKey: ['products'],
    queryFn: getAllProducts,
    cacheTime: 50000,
  });

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

  // Group products into chunks of 3
  const productChunks = chunkProducts(products, 3);

  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-col items-center py-2">

        <Carousel
          showArrows={true}
          infiniteLoop={true}
          showThumbs={false}
          showStatus={false}
          autoPlay={true}          
          interval={3000}        
          stopOnHover={true}     
          className="custom-carousel w-full "  // Adjust max-width to accommodate 3 cards
        >
          {productChunks?.map((chunk, index) => (
            <div key={index} className="flex justify-around mx-auto" style={{ width: "800px" }}>
              {chunk.map((product) => (
                <div key={product.id} className="card w-auto bg-white shadow mx-2">
                  <figure>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="custom-height w-auto "
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{product.name}</h2>
                    <p className="text-lg font-semibold">${product.price}</p>
                  </div>
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
