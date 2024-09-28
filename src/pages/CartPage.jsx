/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import {
  getCart,
  removeFromCart,
  updateCartItem,
  clearCart,
} from "./../utils/api/cartApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [pendingUpdates, setPendingUpdates] = useState({});
  const [isRemoving, setIsRemoving] = useState(null);
  const [isClearing, setIsClearing] = useState(false);
  const [loadingConfirm, setLoadingConfirm] = useState({});

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await getCart();
        setCart(response.data.cart);
        calculateTotals(response.data.cart);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const calculateTotals = (cartItems) => {
    const totalQty = cartItems.reduce(
      (sum, product) => sum + product.quantity,
      0
    );
    const totalPrice = cartItems.reduce(
      (sum, product) => sum + product.price,
      0
    );
    setTotalQuantity(totalQty);
    setTotalPrice(totalPrice);
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    const cartItem = cart.find((item) => item._id === itemId);
    const sizeStock = cartItem.product.stock.find(
      (s) => s.size === cartItem.size
    );

    if (newQuantity < 1) return;

    if (newQuantity > sizeStock.quantity) {
      toast.error(
        `Not enough quantity of size ${cartItem.size} in stock. Available: ${sizeStock.quantity}`
      );
      return;
    }

    setPendingUpdates((prev) => ({
      ...prev,
      [itemId]: newQuantity,
    }));

    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const confirmUpdateQuantity = async (itemId) => {
    const newQuantity = pendingUpdates[itemId];

    setLoadingConfirm((prev) => ({ ...prev, [itemId]: true }));

    try {
      await updateCartItem(itemId, {
        size: cart.find((item) => item._id === itemId).size,
        quantity: newQuantity,
      });
      const updatedCart = await getCart();
      setCart(updatedCart.data.cart);
      calculateTotals(updatedCart.data.cart);
      setPendingUpdates((prev) => {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoadingConfirm((prev) => ({ ...prev, [itemId]: false }));
    }
  };

  const handleRemoveFromCart = async (itemId) => {
    setIsRemoving(itemId);
    try {
      await removeFromCart(itemId);
      const updatedCart = cart.filter((item) => item._id !== itemId);
      setCart(updatedCart);
      calculateTotals(updatedCart);
    } catch (err) {
      toast.error("Error removing product");
    } finally {
      setIsRemoving(null);
    }
  };

  const handleClearCart = async () => {
    setIsClearing(true);
    try {
      await clearCart();
      setCart([]);
      setTotalPrice(0);
      setTotalQuantity(0);
    } catch (err) {
      toast.error("Error clearing cart");
    } finally {
      setIsClearing(false);
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
      {!cart || cart.length === 0 ? (
        <div className="mt-20 text-center">
          <h2 className="font-bold text-3xl text-black">Your Cart is Empty</h2>
          <img className="mt-10" src="/emptyCartBG.png" alt="empty cart" />
        </div>
      ) : (
        <div className="mb-5">
          <h1 className="mb-5 font-bold text-3xl text-black">Shopping Cart</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="col-span-2">
              {cart.map((product) => (
                <div
                  key={product._id}
                  className="bg-white shadow-lg rounded-lg p-5 mb-5"
                >
                  <div className="flex items-center">
                    <img
                      className="w-24 h-24 rounded"
                      src={product.product.image}
                      alt={product.product.name}
                    />
                    <div className="ml-5 flex-grow">
                      <h2 className="font-bold text-lg">
                        {product.product.name}
                      </h2>
                      <p className="text-gray-500">Size: {product.size}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold">
                        EGP {product.product.price * product.quantity}
                      </p>
                      <p className="text-gray-500">Qty: {product.quantity}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center">
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            product._id,
                            product.quantity - 1
                          )
                        }
                        className="btn btn-outline btn-neutral"
                        disabled={product.quantity <= 1}
                      >
                        -1
                      </button>
                      <span className="mx-3">
                        {pendingUpdates[product._id] !== undefined
                          ? pendingUpdates[product._id]
                          : product.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            product._id,
                            product.quantity + 1
                          )
                        }
                        className="btn btn-outline btn-neutral"
                        disabled={
                          pendingUpdates[product._id] >=
                          product.product.stock.find(
                            (s) => s.size === product.size
                          ).quantity
                        }
                      >
                        +1
                      </button>
                      {pendingUpdates[product._id] !== undefined && (
                        <button
                          onClick={() => confirmUpdateQuantity(product._id)}
                          className="bg-slate-50 hover:bg-green-900 hover:text-white btn text-SecondaryColor border border-SecondaryColor ml-3"
                          disabled={loadingConfirm[product._id]}
                        >
                          {loadingConfirm[product._id] ? (
                            <span className="loading loading-ring loading-md"></span>
                          ) : (
                            "Confirm"
                          )}
                        </button>
                      )}
                    </div>
                    <button
                      onClick={() => handleRemoveFromCart(product._id)}
                      className="btn btn-outline btn-danger"
                      disabled={isRemoving === product._id}
                    >
                      {isRemoving === product._id ? (
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
                  className="bg-slate-50 hover:bg-green-900 hover:text-white text-SecondaryColor border border-SecondaryColor transition duration-300 ease-in-out rounded-lg py-2 px-14 mt-16 w-full  "
                  disabled={isClearing}
                >
                  {isClearing ? (
                    <span className="loading loading-ring loading-md"></span>
                  ) : (
                    "Clear Cart"
                  )}
                </button>
                <button className="bg-SecondaryColor hover:bg-green-900 transition duration-300 ease-in-out rounded-lg text-white px-14 py-2 mt-2 w-full  ">
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
