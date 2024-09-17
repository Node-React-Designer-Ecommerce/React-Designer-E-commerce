import { useState, useEffect } from "react";
import ArrowRight from "./../icons/ArrowRight";
import { Link } from "react-router-dom";

function ProductItem() {
  const [products, setProduct] = useState(null); // Initially, no product data
  const [loading, setLoading] = useState(true); // Set initial loading state to true
  const [error, setError] = useState(null); // Initially, no error

  useEffect(() => {
    // Fetch data from the API
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          "https://react-node-designer.glitch.me/api/v1/products"
        );
        const data = await response.json();

        console.log("Data fetched from API:", data.data.products);
        const products = data.data.products;
        console.log(products);
        if (products && products.length > 0) {
          setProduct(products);
        } else {
          setError("No products available.");
        }

        setLoading(false); // Stop loading after data is fetched
      } catch (err) {
        console.error("Error fetching product data:", err); // Log the error if any
        setError(err.message); // Catch any errors and store the message
        setLoading(false); // Stop loading even if there's an error
      }
    };

    fetchProduct();
  }, []);

  // Conditional rendering based on state
  if (loading) return;
  <>
    <span className="loading loading-ball loading-xs"></span>
    <span className="loading loading-ball loading-sm"></span>
    <span className="loading loading-ball loading-md"></span>
    <span className="loading loading-ball loading-lg"></span>
  </>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="font-serif flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-5">
        <div className="flex gap-3">
          {products.map((product) => (
            <div key={product._id} className="card bg-base-100 w-80 shadow-xl">
              <figure className="px-5 pt-10">
                <img src="/men.jpg" alt="" />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{product.name}</h2>
                <p>{product.description}</p>
                <p className="text-green-800">${product.price}</p>
                <div className="card-actions">
                  <Link to={`/product-details/${product._id}`} className="flex">
                    See More <ArrowRight />
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

export default ProductItem;
