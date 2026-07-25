import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaTimes } from "react-icons/fa";
import { WishlistContext } from "../components/context/WishlistContext";
import { CartContext } from "../components/context/CartContext";
import "./WishlistPage.css";

function WishlistPage() {
  const { wishlistItems, removeFromWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <div className="wishlist-page">
      <div className="breadcrumb">
        <div className="container breadcrumb-content">
          <Link to="/">Home</Link>
          <span>/</span>
          <span className="active">Wishlist</span>
        </div>
      </div>

      <div className="container">
        <div className="wishlist-container">
          <h3 className="wishlist-title">Wishlist</h3>

          {wishlistItems && wishlistItems.length > 0 ? (
            <table className="wishlist-table">
              <thead>
                <tr>
                  <th>Products</th>
                  <th>Price</th>
                  <th>Stock Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {wishlistItems.map((item) => {
                  const isStock = item.inStock !== false;

                  return (
                    <tr key={item.id}>
                      {/* Products */}
                      <td>
                        <div className="wishlist-product-info">
                          <img
                            src={
                              item.image ||
                              item.thumbnail ||
                              "https://via.placeholder.com/60"
                            }
                            alt={item.title || item.name}
                          />
                          <p className="wishlist-product-name">
                            {item.title || item.name}
                          </p>
                        </div>
                      </td>

                      <td>
                        <div className="price-box">
                          {item.oldPrice && (
                            <span className="old-price">${item.oldPrice}</span>
                          )}
                          <span className="current-price">${item.price}</span>
                        </div>
                      </td>

                      <td>
                        <span
                          className={`stock-status ${
                            isStock ? "in-stock" : "out-of-stock"
                          }`}
                        >
                          {isStock ? "IN STOCK" : "OUT OF STOCK"}
                        </span>
                      </td>

                      <td>
                        <div className="action-box">
                          <button
                            type="button"
                            className={`add-cart-btn ${
                              !isStock ? "disabled" : ""
                            }`}
                            disabled={!isStock}
                            onClick={() => handleAddToCart(item)}
                          >
                            Add To Cart <FaShoppingCart />
                          </button>

                          <button
                            type="button"
                            className="remove-btn"
                            title="Remove item"
                            onClick={() => removeFromWishlist(item.id)}
                          >
                            <FaTimes />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="empty-wishlist">
              <p>Sizning Wishlist'ingiz bo'sh.</p>
              <Link
                to="/shop"
                className="add-cart-btn"
                style={{ display: "inline-flex", textDecoration: "none" }}
              >
                Mahsulotlarni ko'rish
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default WishlistPage;
