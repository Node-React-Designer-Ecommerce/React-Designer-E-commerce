import { useState, useEffect } from "react";

function ProductItem() {
  const [products, setProduct] = useState(null); // Initially, no product data
  const [loading, setLoading] = useState(true); // Set initial loading state to true
  const [error, setError] = useState(null); // Initially, no error

  useEffect(() => {
    // Fetch data from the API
    const fetchProduct = async () => {
      try {
        const response = await fetch("https://react-node-designer.glitch.me/api/v1/products");
        const data = await response.json();
        
        console.log("Data fetched from API:", data.data.products); 
        const products = data.data.products
        console.log(products)
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
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className=" font-serif flex flex-row gap-8"> 
      {products.map((product) => (
        <div key={product._id} className="border font-serif flex flex-col gap-5">
          <div className="w-full">
            <img className="w-full" src="men.jpg" alt={product.name} />
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p className="text-sm">English Department</p>
            <p className="text-slate-600">
              {product.price}$
              <span className="text-red-950 pl-3 line-through font-bold">650$</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductItem;
