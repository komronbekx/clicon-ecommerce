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
import BuildingPage from "./pages/BuildingPage";
import NewsDetail from "./pages/NewsDetail";
import "./components/Header/Header.css";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <Router>
      <header className="main-header">
        <TopBar />
        <Navbar />
      </header>
      <CategoryBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/track-order" element={<TrackOrder />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/coming-soon" element={<BuildingPage />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/login" element={<LoginPage />} />{" "}
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
