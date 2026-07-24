import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Header komponentlari
import TopBar from "./components/Header/TopBar";
import Navbar from "./components/Header/Navbar";
import CategoryBar from "./components/Header/CategoryBar";
import Footer from "./components/Footer/Footer";

// Sahifalar
import Home from "./pages/Home";
import ShopPage from "./pages/ShopPage";
import TrackOrder from "./pages/TrackOrder";
import WishlistPage from "./pages/WishlistPage";

function App() {
  return (
    <Router>
      {/* Har bir sahifada tepada turadigan bo'limlar */}
      <TopBar />
      <Navbar />
      <CategoryBar />

      {/* Sahifalar almashadigan bo'lim */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/track-order" element={<TrackOrder />} />
        <Route path="/wishlist" element={<WishlistPage />} />
      </Routes>

      {/* Har bir sahifada pastda turadigan bo'lim */}
      <Footer />
    </Router>
  );
}

export default App;
