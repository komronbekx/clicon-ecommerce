import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // ⬅️ Link va useNavigate qo'shildi
import "./Header.css";
import {
  FaSearch,
  FaHeart,
  FaShoppingCart,
  FaUser,
  FaTimes,
  FaArrowRight,
} from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function Navbar() {
  const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const navigate = useNavigate();

  const { cartItems, removeFromCart, subTotal, totalCount, addToCart } =
    useCart();
  const { wishlistItems, removeFromWishlist } = useWishlist();

  const wishlistCount = wishlistItems?.length || 0;

  // Popover va sahifaga o'tishni birga boshqaruvchi funksiya
  const handleWishlistClick = () => {
    // Mobil/Desktop uchun: agar bosilsa sahifaga o'tadi
    navigate("/wishlist");
    setShowWishlist(false);
  };

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        {/* Logo */}
        <Link to="/" className="logo" style={{ textDecoration: "none" }}>
          <div className="logo-circle">O</div>
          <h2>CLICON</h2>
        </Link>

        {/* Search */}
        <div className="search-box">
          <input type="text" placeholder="Search for anything..." />
          <button type="button">
            <FaSearch />
          </button>
        </div>

        {/* Icons */}
        <div className="navbar-icons">
          {/* 1. SAVAT TUGMASI VA DROPDOWN */}
          <div
            className="cart-dropdown-wrapper"
            style={{ position: "relative" }}
          >
            <button
              type="button"
              className="icon-btn cart-icon-btn"
              onClick={() => {
                setShowCart(!showCart);
                setShowWishlist(false);
              }}
            >
              <FaShoppingCart />
              {totalCount > 0 && (
                <span className="cart-badge">{totalCount}</span>
              )}
            </button>

            {/* SHOPPING CART POPOVER */}
            {showCart && (
              <div className="cart-popover">
                <div className="cart-header">
                  Shopping Cart{" "}
                  <span>({String(totalCount).padStart(2, "0")})</span>
                </div>

                <div className="cart-items-list">
                  {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                      <div key={item.id} className="cart-item">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="cart-item-img"
                        />
                        <div className="cart-item-info">
                          <p className="cart-item-title">{item.title}</p>
                          <p className="cart-item-price">
                            {item.quantity} x{" "}
                            <span>${item.price?.toLocaleString()}</span>
                          </p>
                        </div>
                        <button
                          type="button"
                          className="remove-item-btn"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <FaTimes />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="empty-cart">Savatingiz bo'sh</div>
                  )}
                </div>

                {/* Sub-total bo'limi */}
                <div className="cart-footer">
                  <div className="subtotal-row">
                    <span>Sub-Total:</span>
                    <strong>${subTotal?.toLocaleString()}.00 USD</strong>
                  </div>

                  <button type="button" className="checkout-btn">
                    CHECKOUT NOW <FaArrowRight />
                  </button>

                  <button
                    type="button"
                    className="view-cart-btn"
                    onClick={() => {
                      setShowCart(false);
                      navigate("/cart");
                    }}
                  >
                    VIEW CART
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 2. WISHLIST TUGMASI VA DROPDOWN */}
          <div
            className="wishlist-icon-wrapper"
            style={{ position: "relative" }}
            onMouseEnter={() => setShowWishlist(true)}
            onMouseLeave={() => setShowWishlist(false)}
          >
            {/* Wishlist tugmasi (Bosilsa sahifaga o'tadi) */}
            <button
              type="button"
              className="icon-btn"
              onClick={handleWishlistClick}
            >
              <FaHeart
                style={{ color: wishlistCount > 0 ? "#ee5858" : "inherit" }}
              />
              {wishlistCount > 0 && (
                <span className="cart-badge">{wishlistCount}</span>
              )}
            </button>

            {/* Hover bo'lganda ko'rinadigan Wishlist Dropdown Popup */}
            {showWishlist && (
              <div className="cart-popover wishlist-popover">
                <div
                  className="cart-header"
                  onClick={handleWishlistClick}
                  style={{ cursor: "pointer" }}
                >
                  Wishlist{" "}
                  <span>({String(wishlistCount).padStart(2, "0")})</span>
                </div>

                <div className="cart-items-list">
                  {wishlistItems && wishlistItems.length > 0 ? (
                    wishlistItems.map((item) => (
                      <div key={item.id} className="cart-item">
                        <img
                          src={item.image || item.thumbnail}
                          alt={item.title || item.name}
                          className="cart-item-img"
                          onClick={handleWishlistClick}
                          style={{ cursor: "pointer" }}
                        />
                        <div className="cart-item-info">
                          <p
                            className="cart-item-title"
                            onClick={handleWishlistClick}
                            style={{ cursor: "pointer" }}
                          >
                            {item.title || item.name}
                          </p>
                          <p className="cart-item-price">
                            <span>${item.price}</span>
                          </p>
                        </div>

                        {/* Savatga o'tkazish hamda wishlistdan o'chirish */}
                        <button
                          type="button"
                          className="remove-item-btn"
                          onClick={() => removeFromWishlist(item.id)}
                          title="O'chirish"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="empty-cart">Wishlist bo'sh</div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* 3. USER TUGMASI */}
          <button
            type="button"
            className="icon-btn"
            onClick={() => navigate("/profile")}
          >
            <FaUser />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
