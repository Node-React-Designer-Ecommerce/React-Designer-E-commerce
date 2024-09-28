import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import PropTypes from 'prop-types';
import {
  getCart,
  removeFromCart,
  updateCartItem,
  clearCart,
  addToCart as addToCartApi,
} from "./../utils/api/cartApi";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
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
      (sum, product) => sum + product.price * product.quantity,
      0
    );
    setTotalQuantity(totalQty);
    setTotalPrice(totalPrice);
  };

  const addToCart = async (cartItem) => {
    try {
      const response = await addToCartApi(cartItem);
      const updatedCart = await getCart();
      setCart(updatedCart.data.cart);
      calculateTotals(updatedCart.data.cart);
      return response;
    } catch (error) {
      throw error.response.data;
    }
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
      toast.error(`${err} Error removing product`);
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
      toast.error(`${err} Error clearing cart`);
    } finally {
      setIsClearing(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        totalPrice,
        totalQuantity,
        pendingUpdates,
        isRemoving,
        isClearing,
        loadingConfirm,
        addToCart,
        handleQuantityChange,
        confirmUpdateQuantity,
        handleRemoveFromCart,
        handleClearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};