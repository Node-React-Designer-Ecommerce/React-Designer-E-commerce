//contexts
import { useCart } from "../context/CartContext";

//empty cart
import EmptyCart from "../components/EmptyCart";

//toasts
import "react-toastify/dist/ReactToastify.css";

//order Api
import { createOrder } from "./../utils/api/orderApi";
import { useState } from "react";
export default function CartPage() {
  const { totalQuantity, totalPrice } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [iframeSrc, setIframeSrc] = useState("");

  const {
    cart,
    loading,
    pendingUpdates,
    isRemoving,
    isClearing,
    loadingConfirm,
    handleQuantityChange,
    confirmUpdateQuantity,
    handleRemoveFromCart,
    handleClearCart,
  } = useCart();

  const checkout = async () => {
    const paymentMethod = "Online";
    const order = await createOrder(paymentMethod); // Assuming createOrder is defined elsewhere
    const hash = order.data.kashierOrderHash;
    const orderId = order.data.order._id;
    const totalPrice = order.data.order.totalPrice;

    console.log(hash, "--222--", orderId);

    // Set the iframe source
    const src = `https://checkout.kashier.io/?merchantId=MID-28559-7&orderId=${orderId}&amount=${totalPrice}&currency=EGP&hash=${hash}&mode=test&metaData={"metaData":"myData"}&merchantRedirect=http://localhost:5173/success-payment&allowedMethods=card,wallet&failureRedirect=false&redirectMethod=get&brandColor=%2314532d&display=en&serverWebhook=https://react-node-designer.glitch.me/api/v1/orders/kashier`;

    setIframeSrc(src); // Set the iframe source in state
    setIsOpen(true);
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

  // Close modal when clicking outside
  const handleClickOutside = (e) => {
    if (e.target.id === "modal-overlay") {
      handleCloseModal();
    }
  };

  return (
    <div className="container mx-auto">
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
        <div className="m-5">
          <h1 className="mb-5 font-bold text-3xl text-black">Shopping Cart</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="col-span-2">
              {cart.map((product) => (
                <div
                  key={product?._id}
                  className="bg-white shadow-lg rounded-lg p-5 mb-5"
                >
                  <div className="flex items-center">
                    <img
                      className="w-24 h-24 rounded"
                      src={product?.product?.image}
                      alt={product?.product?.name}
                    />
                    <div className="ml-5 flex-grow">
                      <h2 className="font-bold text-lg">
                        {product?.product?.name}
                      </h2>
                      <p className="text-gray-500">Size: {product?.size}</p>
                    </div>
                    <div className="text-left">
                      <div className="flex ">
                        <p className="text-lg font-bold">Price : </p>
                        <p className="text-lg ms-2 ">
                          <span className="text-gray-400 text-base">EGP</span>{" "}
                          {product?.product?.price}
                        </p>
                      </div>

                      <div className="flex justify-between">
                        <p className="text-lg font-bold">Total Price : </p>
                        <p className="text-lg ms-3 ">
                          <span className="text-gray-400 text-base">EGP</span>{" "}
                          {product?.product?.price * product?.quantity}
                        </p>
                      </div>
                      <div>
                        <p className="text-base font-bold">
                          Qty: {product?.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center">
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            product?._id,
                            product?.quantity - 1
                          )
                        }
                        className="btn btn-outline btn-neutral"
                        disabled={product?.quantity <= 1}
                      >
                        -1
                      </button>
                      <span className="mx-3">
                        {pendingUpdates[product?._id] !== undefined
                          ? pendingUpdates[product?._id]
                          : product?.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            product?._id,
                            product?.quantity + 1
                          )
                        }
                        className="btn btn-outline btn-neutral"
                        disabled={
                          pendingUpdates[product?._id] >=
                          product?.product?.stock?.find(
                            (s) => s?.size === product?.size
                          )?.quantity
                        }
                      >
                        +1
                      </button>
                      {pendingUpdates[product?._id] !== undefined && (
                        <button
                          onClick={() => confirmUpdateQuantity(product?._id)}
                          className="bg-slate-50 hover:bg-green-900 hover:text-white btn text-SecondaryColor border border-SecondaryColor ml-3"
                          disabled={loadingConfirm[product?._id]}
                        >
                          {loadingConfirm[product?._id] ? (
                            <span className="loading loading-ring loading-md"></span>
                          ) : (
                            "Confirm"
                          )}
                        </button>
                      )}
                    </div>
                    <button
                      onClick={() => handleRemoveFromCart(product?._id)}
                      className="btn btn-outline btn-danger"
                      disabled={isRemoving === product?._id}
                    >
                      {isRemoving === product?._id ? (
                        <span className="loading loading-ring loading-md"></span>
                      ) : (
                        "Remove"
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Section */}
            <div className="col-span-1 bg-gray-100 p-5 rounded-lg">
              <h2 className="font-bold text-2xl text-black">Order Summary</h2>
              <div className="mt-5">
                <div className="flex justify-between">
                  <span className="font-bold">Total Quantity:</span>
                  <span>{totalQuantity}</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="font-bold">Total Price:</span>
                  <span>EGP {totalPrice}</span>
                </div>
                <button
                  onClick={handleClearCart}
                  className="bg-slate-50 hover:bg-red-600 hover:text-white text-red-500 border border-red-500 transition duration-300 ease-in-out rounded-lg py-2 px-14 mt-16 w-full  "
                  disabled={isClearing}
                >
                  {isClearing ? (
                    <span className="loading loading-ring loading-md"></span>
                  ) : (
                    "Clear Cart"
                  )}
                </button>
                <button
                  className="bg-SecondaryColor hover:bg-green-900 transition duration-300 ease-in-out rounded-lg text-white px-14 py-2 mt-2 w-full  "
                  onClick={checkout}
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
