import { useState, useEffect } from "react";
import { getAllProducts } from '../utils/api/productsapi';
import Skelton from './../layouts/Skelton';
import './../styles/CarouselCustom.css';

function LandingProductItem() {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
    <div className="flex flex-col justify-center w-full">
      <div className="flex flex-col items-center py-6 w-full">
        <div className="carousel carousel-center  rounded-box max-w-md space-x-4 p-4">
          {products.map((product, index) => (
            <div key={product.id} className="carousel-item">
              <div className=" w-72 h-96 bg-white border-2 shadow-lg mx-2">
                <figure>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </figure>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default LandingProductItem;