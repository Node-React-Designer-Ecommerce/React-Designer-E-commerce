//import { Link } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getIsDesignableProduct } from "../../utils/api/productsapi";

export default function CardOfDesigner() {
  // const products = [
  //   {
  //     id: 1,
  //     title: "Short Sleeve T-Shirt",
  //     image: "T-SHIRT.png",
  //     price: "150",
  //   },
  //   {
  //     id: 2,
  //     title: "Hoodie",
  //     image: "hoodie.webp",
  //     price: "300",
  //   },
  //   {
  //     id: 3,
  //     title: "Long Sleeve T-Shirt",
  //     image: "sleevet-shirt.jpg",
  //     price: "200",
  //   },
  // ];
  const { data, isLoading, error } = useQuery({
    queryKey: ["isDesignableProducts"],
    queryFn: getIsDesignableProduct,
    cacheTime: 50000,
  });
  console.log(data);

  if (isLoading) {
    return <div>Loading...</div>; // Loading state
  }

  if (error) {
    return <div>Error: {error.message}</div>; // Display error message
  }

  const products = data || []; // Ensure products is an array
  return (
    <div className="mt-32">
      <div className="mb-5 font-bold text-4xl text-black text-center">
        Choose your piece
      </div>
      <div className="font-serif flex justify-center">
        <div className="flex justify-center">
          <div className="grid grid-cols-1 xl:grid-cols-3  md:grid-cols-2 gap-5">
            {products.map((product) => (
              <div key={product.id} className="card bg-base-100 w-80 shadow-xl">
                <figure className="px-5 relative pt-10">
                  <img src={product.image} alt="Shoes" className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title uppercase">{product.title}</h2>

                  <p className="text-green-800">EGP {product.price}</p>
                  <Link
                    to={`/designer/${product.id}`}
                    className="flex justify-between  w-44 bg-SecondaryColor text-white rounded cursor-pointer hover:bg-gray-700 transition duration-300 ease-in-out text-center p-2 text-center "
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

///////////////////////////////////////////////////////

// import React, { useState, useEffect } from 'react';

// const DynamicBackground = () => {
//     const [backgroundImage, setBackgroundImage] = useState('');

//     useEffect(() => {
//         // Function to fetch the image URL from the API
//         const fetchBackgroundImage = async () => {
//             try {
//                 const response = await fetch('https://api.example.com/background-image');
//                 const data = await response.json();
//                 const imageUrl = data.imageUrl;
//                 setBackgroundImage(imageUrl);
//             } catch (error) {
//                 console.error('Error fetching background image:', error);
//             }
//         };

//         // Call the function to fetch and set the background image
//         fetchBackgroundImage();
//     }, []);

//     return (
// <div
//             className="w-full h-screen bg-cover bg-center"
//             style={{ backgroundImage: `url(${backgroundImage})` }}
// ></div>
//     );
// };

// export default DynamicBackground;
