import { createOrder } from "./../utils/api/orderApi";
import { useCart } from "../context/CartContext";
import EmptyCart from "../components/EmptyCart";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import XIcon from "../icons/XIcon";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const {
    totalQuantity,
    totalPrice,
    cart,
    loading,
    isRemoving,
    isClearing,
    updatingQuantity,
    handleQuantityChange,
    handleRemoveFromCart,
    handleClearCart,
    getAvailableStock,
  } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showClearCartModal, setShowClearCartModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [iframeSrc, setIframeSrc] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Online");
  const navigate = useNavigate();

  const changePaymentMethod = (e) => {
    setPaymentMethod(e.target.value);
  };

  const checkout = async () => {
    console.log(paymentMethod);
    if (paymentMethod === "Online") {
      await Onlinecheckout();
    } else if (paymentMethod === "COD") {
      // Assuming COD function is defined elsewhere in the file
      await CODcheckout();
    }
  };
  const CODcheckout = async () => {
    await createOrder(paymentMethod);
    navigate("/user-profile"); //FIXME:
  };

  const Onlinecheckout = async () => {
    try {
      const order = await createOrder(paymentMethod);
      const hash = order.data.kashierOrderHash;
      const orderId = order.data.order._id;
      const totalPrice = order.data.order.totalPrice;

      const src = `https://checkout.kashier.io/?merchantId=MID-28559-7&orderId=${orderId}&amount=${totalPrice}&currency=EGP&hash=${hash}&mode=test&metaData={"metaData":"myData"}&merchantRedirect=http://localhost:5173/success-payment&allowedMethods=card,wallet&failureRedirect=false&redirectMethod=get&brandColor=%2381B3DC&display=en&serverWebhook=https://react-node-designer.glitch.me/api/v1/orders/kashier`;

      setIframeSrc(src);
      setIsOpen(true);
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleClickOutside = (e) => {
    if (e.target.id === "modal-overlay") {
      handleCloseModal();
    }
  };

  const handleDeleteConfirm = (id) => {
    setItemToDelete(id);
    setShowModal(true);
  };

  const handleDeleteCancel = () => {
    setItemToDelete(null);
    setShowModal(false);
  };

  const handleDeleteConfirmed = () => {
    if (itemToDelete) {
      handleRemoveFromCart(itemToDelete);
    }
    setItemToDelete(null);
    setShowModal(false);
  };

  const handleClearCartConfirm = () => {
    setShowClearCartModal(true);
  };

  const handleClearCartCancel = () => {
    setShowClearCartModal(false);
  };

  const handleClearCartConfirmed = async () => {
    try {
      await handleClearCart();
    } finally {
      setShowClearCartModal(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

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
              style={{ border: "none", overflow: "hidden" }}
            />
          </div>
        </div>
      )}
      {!cart || cart.length === 0 ? (
        <EmptyCart></EmptyCart>
      ) : (
        <div className="my-5 mx-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">
            <div className="col-span-2">
              <div className="flex justify-between">
                <h1 className="mb-5 font-bold text-3xl text-textColor">
                  Shopping Cart
                </h1>
                <button
                  onClick={handleClearCartConfirm}
                  className="text-red-500 border border-red-500 transition duration-300 ease-in-out rounded px-3 py-1 h-9"
                  disabled={isClearing}
                >
                  {isClearing ? (
                    <span className="loading loading-ring loading-md"></span>
                  ) : (
                    "Clear Cart"
                  )}
                </button>
              </div>
              {cart.map((product) => {
                const availableStock = getAvailableStock(product);
                const isMinQuantity = product.quantity <= 1;
                const isMaxQuantity = product.quantity >= availableStock;
                const isUpdating = updatingQuantity === product._id;

                return (
                  <div
                    key={product?._id}
                    className="relative bg-white shadow-lg rounded-lg py-5 px-10 my-5"
                  >
                    <div className="lg:flex md:flex items-center">
                      <img
                        className="w-32 h-32 rounded object-cover"
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
                            onClick={() => handleDeleteConfirm(product?._id)}
                            className="text-white rounded-3xl w-11 h-11 flex justify-center items-center cursor-pointer"
                            disabled={isRemoving === product?._id}
                          >
                            {isRemoving === product?._id ? (
                              <span className="loading loading-ring loading-md "></span>
                            ) : (
                              <XIcon />
                            )}
                          </button>
                        </div>
                        <div className="flex justify-start">
                          <p className="text-lg font-bold">Price : </p>
                          <p className="text-lg ms-2">
                            {product?.type === "Product"
                              ? product?.product?.price
                              : product?.design?.totalPrice}
                            <span className="text-gray-400 text-base">EG</span>
                          </p>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-lg font-bold">Total Price : </p>
                          <p className="text-lg ms-3">
                            {product?.type === "Product"
                              ? product?.product?.price * product?.quantity
                              : product?.design?.totalPrice * product?.quantity}
                            <span className="text-gray-400 text-base">EG</span>
                          </p>
                        </div>
                        <div className="flex items-center justify-start mt-3">
                          <div className="flex items-center">
                            <button
                              onClick={() =>
                                handleQuantityChange(
                                  product?._id,
                                  product?.quantity - 1
                                )
                              }
                              className={`rounded border border-buttonColor w-10 h-10 text-lg flex items-center justify-center text-buttonColor transition duration-300 ease-in-out ${
                                isMinQuantity || isUpdating
                                  ? "opacity-50 cursor-not-allowed"
                                  : "hover:bg-gray-100 cursor-pointer"
                              }`}
                              disabled={isMinQuantity || isUpdating}
                            >
                              -
                            </button>
                            <span className="mx-3">
                              {isUpdating ? (
                                <span className="loading loading-spinner loading-sm"></span>
                              ) : (
                                product?.quantity
                              )}
                            </span>
                            <button
                              onClick={() =>
                                handleQuantityChange(
                                  product?._id,
                                  product?.quantity + 1
                                )
                              }
                              className={`rounded border border-buttonColor w-10 h-10 text-lg flex items-center justify-center text-buttonColor transition duration-300 ease-in-out ${
                                isMaxQuantity || isUpdating
                                  ? "opacity-50 cursor-not-allowed"
                                  : "hover:bg-gray-100 cursor-pointer"
                              }`}
                              disabled={isMaxQuantity || isUpdating}
                            >
                              +
                            </button>
                          </div>
                          {product?.type === "Product" && (
                            <span
                              className="ml-3 text-sm text-gray-500 "
                              hidden={!isMaxQuantity}
                            >
                              {availableStock} in stock
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
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
                  <span>{totalPrice} EG</span>
                </div>
                <div className="flex justify-between mt-2">
                  {/* <span className="font-bold">Payment Method:</span>
                  <select name="paymentMethod" id="paymentMethod">
                    <option value="Online">Online</option>
                    <option value="COD">COD</option>
                  </select> */}
                  {/* <div className="flex flex-col sm:flex-row gap-5  items-end sm:items-center"> */}
                  <div>
                    <label className="font-bold">Payment Method:</label>
                  </div>
                  <div className="flex flex-wrap gap-2 text-[12px] items-end font-medium">
                    {["Online", "COD"].map((method) => (
                      <label className="flex items-center gap-1" key={method}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method}
                          className="radio"
                          onChange={changePaymentMethod}
                        />
                        {method}
                      </label>
                    ))}
                  </div>
                  {/* </div> */}
                </div>
                <button
                  className="transition duration-300 ease-in-out rounded text-white px-14 py-2 mt-10 w-full"
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
      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Confirm Delete</h3>
            <p className="py-4">Are you sure you want to delete this design?</p>
            <div className="modal-action">
              <button
                onClick={handleDeleteConfirmed}
                className="btn border border-red-500 bg-white hover:bg-red-500 hover:text-white duration-300"
              >
                Delete
              </button>
              <button onClick={handleDeleteCancel} className="btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Modal for clearing the cart */}
      {showClearCartModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-lg font-bold mb-4">Clear Cart</h2>
            <p>Are you sure you want to clear the entire cart?</p>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={handleClearCartConfirmed}
                className="btn border border-red-500 bg-white hover:bg-red-500 hover:text-white duration-300"
              >
                Clear Cart
              </button>
              <button onClick={handleClearCartCancel} className="btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
