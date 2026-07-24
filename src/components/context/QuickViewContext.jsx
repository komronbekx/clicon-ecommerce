import React, { createContext, useContext, useState } from "react";

const QuickViewContext = createContext();

export function QuickViewProvider({ children }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openQuickView = (product) => {
    setSelectedProduct(product);
  };

  const closeQuickView = () => {
    setSelectedProduct(null);
  };

  return (
    <QuickViewContext.Provider
      value={{ selectedProduct, openQuickView, closeQuickView }}
    >
      {children}
    </QuickViewContext.Provider>
  );
}

export function useQuickView() {
  return useContext(QuickViewContext);
}
