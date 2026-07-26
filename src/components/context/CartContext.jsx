import React, { createContext, useContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart_items");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart_items", JSON.stringify(cartItems));
  }, [cartItems]);

const addToCart = (product, quantity = 1) => {
  if (!product || !product.id) {
    console.error("Mahsulotda 'id' topilmadi:", product);
    return;
  }

  const qtyToAdd = Number(quantity) || 1;

  setCartItems((prevItems) => {
    const existingIndex = prevItems.findIndex((item) => item.id === product.id);

    if (existingIndex > -1) {
      return prevItems.map((item, index) =>
        index === existingIndex
          ? { ...item, quantity: item.quantity + qtyToAdd }
          : item,
      );
    }

    return [
      ...prevItems,
      {
        id: product.id,
        title: product.title || product.name || "Mahsulot",
        price: Number(product.price) || 0,
        image: product.image || product.img || "https://via.placeholder.com/60",
        quantity: qtyToAdd,
      },
    ];
  });
};

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item,
      ),
    );
  };

  const subTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        subTotal,
        totalCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
