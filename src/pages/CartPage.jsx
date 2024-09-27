//import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProductsInCart } from "../utils/api/cartApi";
import { useQuery } from "@tanstack/react-query";

export default function CartPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products in cart"],
    queryFn: getProductsInCart,
    cacheTime: 50000,
  });
  console.log(data);

  if (isLoading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>; // Display error message
  }
  // const { user } = useContext(AuthContext); // Get the logged-in user from auth context
  // const [cart, setCart] = useState([]);

  // useEffect(() => {
  //   const fetchCart = async () => {
  //     if (user) {
  //       console.log(user);
  //       try {
  //         const response = await axios.get("/user/cart");
  //         setCart(response.data.cartItems); // Assuming backend returns cart items
  //         console.log(response.data.cartItems);
  //       } catch (error) {
  //         console.error("Error fetching cart", error);
  //       }
  //     }
  //   };

  //   fetchCart();
  // }, [user]);

  return (
    <div className="mb-5">
      <div className="grid grid-cols-1 lg:grid-cols-3  gap-5">
        <div className="col-span-2 grid grid-rows p-5">
          <h1 className="mb-5 font-bold text-3xl text-black ">Shopping Cart</h1>
          <div className="flex justify-between">
            <div className="mb-5 font-bold text-lg text-black">
              Product Details
            </div>
            <div className="hidden lg:flex justify-between  w-full lg:w-96  me-7 mb-5 font-bold text-lg text-black">
              <div>quantity</div>
              <div>price</div>
              <div>total price</div>
            </div>
          </div>

          <div>
            {/**cart items */}
            <div className="card card-side bg-base-100 shadow-xl w-full h-auto lg:h-60 mt-5 mb-5 rounded-none">
              <figure>
                <img className="w-full h-80" src="men.jpg" alt="t-shirt" />
              </figure>
              <div className="card-body grid grid-cols-1 lg:grid-cols-3 mt-5">
                <div className="col-span-1">
                  <h2 className="card-title">title</h2>
                  <p className="w-full lg:w-44">
                    Click the button to watch on Jetflix app.
                  </p>
                </div>
                <div className="col-span-2 flex flex-col lg:flex-row justify-between items-center lg:justify-around ">
                  <div className="flex items-center space-x-2 mb-2 lg:mb-0   ">
                    <button className="btn btn-outline-secondary total-btn">
                      {" "}
                      -1
                    </button>
                    <p className="mt-2 mx-2 fs-2">counter</p>
                    <button className="btn btn-outline-secondary total-btn">
                      {" "}
                      +1
                    </button>
                  </div>
                  <div className="text-center lg:text-left mb-2 lg:mb-0">
                    {" "}
                    EGP 50
                  </div>
                  <div className="text-center lg:text-left">EGP 100</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* summary */}
        <div className="col-span-1  bg-gray-100 p-5 ms-5">
          <h1 className="mb-5 font-bold text-3xl text-black ">Order Summary</h1>

          <div className=" mt-5  ">
            <div className="flex justify-between mt-16">
              <div className=" mb-5 font-bold text-lg text-black ">
                Quntity :
              </div>
              <div>hvhvhv</div>
            </div>
            <div className="flex justify-between">
              <div className="mb-5 font-bold text-lg text-black ">
                Total Order Price :
              </div>
              <div>EGP 6000.52</div>
            </div>
          </div>

          <Link to={"shady"}>
            <button className="bg-SecondaryColor hover:bg-green-900 transition duration-700 ease-in-out rounded-lg text-white py-2 px-14 mt-16 w-full  ">
              CHECKOUT
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
