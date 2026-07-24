import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { CartProvider } from "./components/context/CartContext";
import { QuickViewProvider } from "./components/context/QuickViewContext";
import { WishlistProvider } from "./components/context/WishlistContext"; // 1. Import qilamiz
import QuickViewModal from "./components/context/QuickViewModal";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <WishlistProvider>
        {" "}
        {/* 2. O'raymiz */}
        <QuickViewProvider>
          <App />
          <QuickViewModal />
        </QuickViewProvider>
      </WishlistProvider>
    </CartProvider>
  </React.StrictMode>,
);
