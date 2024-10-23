import { createOrder } from "./../utils/api/orderApi";
import { useCart } from "../context/CartContext";
import EmptyCart from "../components/EmptyCart";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import DeleteIcon from "../icons/DeleteIcon";

export default function CartPage() {
  const {
    totalQuantity,
    totalPrice,
    cart,
    loading,
    pendingUpdates,
    isRemoving,
    isClearing,
    loadingConfirm,
    handleQuantityChange,
    //confirmUpdateQuantity,
    handleRemoveFromCart,
    handleClearCart,
  } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [iframeSrc, setIframeSrc] = useState("");

  const checkout = async () => {
    const paymentMethod = "Online";
    try {
      const order = await createOrder(paymentMethod);
      const hash = order.data.kashierOrderHash;
      const orderId = order.data.order._id;
      const totalPrice = order.data.order.totalPrice;

      console.log(hash, "--222--", orderId);

      // Set the iframe source
      const src = `https://checkout.kashier.io/?merchantId=MID-28559-7&orderId=${orderId}&amount=${totalPrice}&currency=EGP&hash=${hash}&mode=test&metaData={"metaData":"myData"}&merchantRedirect=http://localhost:5173/success-payment&allowedMethods=card,wallet&failureRedirect=false&redirectMethod=get&brandColor=%2381B3DC&display=en&serverWebhook=https://react-node-designer.glitch.me/api/v1/orders/kashier`;

      setIframeSrc(src); // Set the iframe source in state
      setIsOpen(true);
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleClickOutside = (e) => {
    if (e.target.id === "modal-overlay") {
      handleCloseModal();
    }
  };

  return (
    <div className="container mx-auto ">
      {isOpen && (
        <div
          id="modal-overlay"
          className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50"
          onClick={handleClickOutside}
        >
          <div className="relative min-w-96 max-w-3xl h-full max-h-[90%] bg-white rounded-lg shadow-lg overflow-hidden">
            <button
              className="absolute top-2 right-2 bg-gray-100 text-black rounded-full p-2"
              onClick={handleCloseModal}
            >
              ✕
            </button>

            <iframe
              src={iframeSrc}
              className="w-full h-full"
              style={{
                border: "none",
                overflow: "hidden",
              }}
            />
          </div>
        </div>
      )}
      {!cart || cart.length === 0 ? (
        <EmptyCart></EmptyCart>
      ) : (
        <div className="my-5 mx-20 ">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">
            <div className="col-span-2 ">
              <div className="flex justify-between">
                <h1 className="mb-5 font-bold text-3xl text-textColor">
                  Shopping Cart
                </h1>
                <button
                  onClick={handleClearCart}
                  className="text-red-500  border border-red-500   transition duration-300 ease-in-out rounded px-3 py-1 h-9 "
                  disabled={isClearing}
                >
                  {isClearing ? (
                    <span className="loading loading-ring loading-md"></span>
                  ) : (
                    "Clear Cart"
                  )}
                </button>
              </div>
              {cart.map((product) => (
                <div
                  key={product?._id}
                  className="relative bg-white shadow-lg rounded-lg py-5 px-10 my-5 "
                >
                  <div className="lg:flex md:flex items-center">
                    <img
                      className="w-32 h-32 rounded"
                      src={
                        product?.type === "Product"
                          ? product?.product?.image
                          : product?.design?.image[0]
                      }
                      alt={product?.product?.name}
                    />
                    <div className="ml-5 flex-grow">
                      <h2 className="font-bold text-lg">
                        {product?.product?.name}
                      </h2>
                      <p className="text-gray-500">Size: {product?.size}</p>
                    </div>
                    <div className="text-left">
                      <div className="absolute top-0 right-0 flex justify-end p-2">
                        <button
                          onClick={() => handleRemoveFromCart(product?._id)}
                          className="  text-white rounded-3xl w-11  h-11 flex justify-center items-center cursor-pointer"
                          disabled={isRemoving === product?._id}
                        >
                          {isRemoving === product?._id ? (
                            <span className="loading loading-ring loading-md"></span>
                          ) : (
                            <DeleteIcon />
                          )}
                        </button>
                      </div>
                      <div className="flex justify-start  ">
                        <p className="text-lg font-bold">Price : </p>
                        <p className="text-lg ms-2 ">
                          {product?.type === "Product"
                            ? product?.product?.price
                            : product?.design?.totalPrice}
                          <span className="text-gray-400 text-base">EG</span>{" "}
                        </p>
                      </div>

                      <div className="flex justify-between">
                        <p className="text-lg font-bold">Total Price : </p>
                        <p className="text-lg ms-3 ">
                          {product?.type === "Product"
                            ? product?.product?.price * product?.quantity
                            : product?.design?.totalPrice * product?.quantity}
                          <span className="text-gray-400 text-base">EG</span>{" "}
                        </p>
                      </div>
                      <div className="flex items-center justify-start mt-3">
                        <div className="flex items-center">
                          <div
                            onClick={() =>
                              handleQuantityChange(
                                product?._id,
                                product?.quantity - 1
                              )
                            }
                            className=" rounded border border-buttonColor w-10 h-10 text-lg  flex items-center justify-center text-buttonColor hover:cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out  "
                            disabled={product?.quantity <= 1}
                          >
                            -
                          </div>
                          <span className="mx-3">{product?.quantity}</span>
                          <div
                            onClick={() =>
                              handleQuantityChange(
                                product?._id,
                                product?.quantity + 1
                              )
                            }
                            className=" rounded border border-buttonColor w-10 h-10 text-lg  flex items-center justify-center text-buttonColor hover:cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out "
                            disabled={
                              product?.quantity >=
                              product?.product?.stock?.find(
                                (s) => s?.size === product?.size
                              )?.quantity
                            }
                          >
                            +
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Section */}
            <div className="col-span-1 bg-lightBackGround p-5 rounded-lg h-72">
              <h2 className="font-bold text-2xl text-textColor">
                Order Summary
              </h2>

              <div className="mt-5">
                <div className="flex justify-between">
                  <span className="font-bold">Total Quantity:</span>
                  <span>{totalQuantity}</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="font-bold">Total Price:</span>
                  <span> {totalPrice} EG</span>
                </div>

                <button
                  className="  transition duration-300 ease-in-out rounded text-white px-14 py-2 mt-10 w-full  "
                  onClick={checkout}
                  style={{
                    background: "linear-gradient(to right, #81B3DC, #CE6ADA)",
                  }}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
