import React, { createContext, useContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  // Boshlang'ich state: localStorage'dan olinadi, agar bo'sh bo'lsa [] (bo'sh massiv)
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart_items");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Savat o'zgarganda localStorage'ga saqlash
  useEffect(() => {
    localStorage.setItem("cart_items", JSON.stringify(cartItems));
  }, [cartItems]);

  // Savatga mahsulot qo'shish funksiyasi
  const addToCart = (product) => {
    if (!product || !product.id) {
      console.error("Mahsulotda 'id' topilmadi:", product);
      return;
    }

    setCartItems((prevItems) => {
      // Mahsulot savatda bor-yo'qligini ID bo'yicha tekshirish
      const existingIndex = prevItems.findIndex(
        (item) => item.id === product.id,
      );

      if (existingIndex > -1) {
        // Bor bo'lsa, sonini (quantity) 1 ga oshirish
        return prevItems.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      // Yo'q bo'lsa, yangi mahsulot sifatida qo'shish
      return [
        ...prevItems,
        {
          id: product.id,
          title: product.title || product.name || "Mahsulot",
          price: Number(product.price) || 0,
          image:
            product.image || product.img || "https://via.placeholder.com/60",
          quantity: 1,
        },
      ];
    });
  };

  // Savatdan o'chirish
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Sub-Total (Umumiy summa)
  const subTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  // Umumiy mahsulotlar soni
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, subTotal, totalCount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
