import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
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

  const cartRef = useRef(null);

  const { cartItems, removeFromCart, subTotal, totalCount } = useCart();
  const { wishlistItems, removeFromWishlist } = useWishlist();

  const wishlistCount = wishlistItems?.length || 0;

  const handleWishlistClick = () => {
    navigate("/wishlist");
    setShowWishlist(false);
  };

  const toggleCart = () => {
    setShowCart((prev) => !prev);
    setShowWishlist(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setShowCart(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="logo" style={{ textDecoration: "none" }}>
          <div className="logo-circle">O</div>
          <h2>CLICON</h2>
        </Link>

        <div className="search-box">
          <input type="text" placeholder="Search for anything..." />
          <button type="button">
            <FaSearch />
          </button>
        </div>

        <div className="navbar-icons">
          <div
            ref={cartRef}
            className="cart-dropdown-wrapper"
            style={{ position: "relative" }}
          >
            <button
              type="button"
              className="icon-btn cart-icon-btn"
              onClick={toggleCart}
            >
              <FaShoppingCart />
              {totalCount > 0 && (
                <span className="cart-badge">{totalCount}</span>
              )}
            </button>

            {showCart && (
              <div className="cart-popover">
                <div className="cart-header">
                  Shopping Cart{" "}
                  <span>({String(totalCount).padStart(2, "0")})</span>
                </div>

                <div className="cart-items-list">
                  {cartItems && cartItems.length > 0 ? (
                    cartItems.map((item) => (
                      <div key={item.id} className="cart-item">
                        <img
                          src={item.image || item.thumbnail}
                          alt={item.title || item.name}
                          className="cart-item-img"
                        />
                        <div className="cart-item-info">
                          <p className="cart-item-title">
                            {item.title || item.name}
                          </p>
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

                <div className="cart-footer">
                  <div className="subtotal-row">
                    <span>Sub-Total:</span>
                    <strong>${subTotal?.toLocaleString()}.00 USD</strong>
                  </div>

                  <button
                    type="button"
                    className="checkout-btn"
                    onClick={() => {
                      setShowCart(false);
                      navigate("/checkout");
                    }}
                  >
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

          <div
            className="wishlist-icon-wrapper"
            style={{ position: "relative" }}
            onMouseEnter={() => setShowWishlist(true)}
            onMouseLeave={() => setShowWishlist(false)}
          >
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
