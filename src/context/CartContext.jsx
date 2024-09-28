/* eslint-disable react/prop-types */
// CartContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { getCart } from "./../utils/api/cartApi";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await getCart();
        setCart(response.data.cart);
        calculateTotals(response.data.cart);
      } catch (err) {
        console.error(err.message);
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

  const addToCart = (item) => {
    setCart((prev) => {
      const existingItem = prev.find((i) => i._id === item._id);
      if (existingItem) {
        // Update quantity
        return prev.map((i) =>
          i._id === item._id
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      } else {
        return [...prev, item];
      }
    });
  };

  const updateCartItem = (itemId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  useEffect(() => {
    calculateTotals(cart);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        totalPrice,
        totalQuantity,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
