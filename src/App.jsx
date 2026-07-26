import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopBar from "./components/Header/TopBar";
import Navbar from "./components/Header/Navbar";
import CategoryBar from "./components/Header/CategoryBar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import ShopPage from "./pages/ShopPage";
import TrackOrder from "./pages/TrackOrder";
import WishlistPage from "./pages/WishlistPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  return (
    <Router>
      <TopBar />
      <Navbar />
      <CategoryBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/track-order" element={<TrackOrder />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
