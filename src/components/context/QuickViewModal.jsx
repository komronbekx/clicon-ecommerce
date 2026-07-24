import React, { useState } from "react";
import { useQuickView } from "../context/QuickViewContext";
import { useCart } from "../context/CartContext";
import {
  FaShoppingCart,
  FaTimes,
  FaHeart,
  FaExchangeAlt,
  FaCopy,
  FaFacebookF,
  FaTwitter,
  FaPinterestP,
} from "react-icons/fa";
import "./QuickViewModal.css";

function QuickViewModal() {
  const { selectedProduct, closeQuickView } = useQuickView();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  if (!selectedProduct) return null;

  // Rasmlar massivini tayyorlab olish
  const images =
    selectedProduct.images && selectedProduct.images.length > 0
      ? selectedProduct.images
      : [
          selectedProduct.image ||
            selectedProduct.thumbnail ||
            "https://via.placeholder.com/400",
        ];

  const productPrice = selectedProduct.price || 1699;
  const productTitle =
    selectedProduct.title ||
    selectedProduct.name ||
    "2020 Apple MacBook Pro with Apple M1 Chip";

  const handleAddToCart = () => {
    addToCart({
      id: selectedProduct.id,
      title: productTitle,
      price: productPrice,
      image: images[0],
      quantity: quantity,
    });
  };

  return (
    <div className="quickview-overlay" onClick={closeQuickView}>
      <div className="quickview-modal" onClick={(e) => e.stopPropagation()}>
        {/* Yopish (X) tugmasi */}
        <button className="quickview-close-btn" onClick={closeQuickView}>
          <FaTimes />
        </button>

        <div className="quickview-content">
          {/* CHAP TARAFI: RASMLAR GALLEREYASI */}
          <div className="quickview-gallery">
            <div className="main-image-box">
              <img
                src={images[activeImgIndex] || images[0]}
                alt={productTitle}
              />
            </div>

            {images.length > 1 && (
              <div className="thumbnails-wrapper">
                {images.map((img, idx) => (
                  <div
                    key={idx}
                    className={`thumb-box ${activeImgIndex === idx ? "active" : ""}`}
                    onClick={() => setActiveImgIndex(idx)}
                  >
                    <img src={img} alt="thumbnail" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* O'NG TARAFI: MAHSULOT MA'LUMOTLARI */}
          <div className="quickview-details">
            <div className="rating-row">
              <span className="stars">★★★★★</span>
              <span className="rating-text">4.7 Star Rating</span>
              <span className="feedback-count">(21,671 User feedback)</span>
            </div>

            <h2 className="modal-product-title">{productTitle}</h2>

            <div className="meta-info">
              <div className="meta-col">
                <p>
                  Sku: <span>A264671</span>
                </p>
                <p>
                  Brand: <span>Apple</span>
                </p>
              </div>
              <div className="meta-col">
                <p>
                  Availability: <span className="in-stock">In Stock</span>
                </p>
                <p>
                  Category: <span>Electronics Devices</span>
                </p>
              </div>
            </div>

            <div className="price-row">
              <span className="current-price">${productPrice}</span>
              <span className="old-price">${productPrice + 200}.00</span>
              <span className="discount-badge">21% OFF</span>
            </div>

            <hr className="divider" />

            {/* VARIANTLAR (Color, Size, Memory, Storage) */}
            <div className="options-grid">
              <div className="option-group">
                <label>Color</label>
                <div className="color-dots">
                  <span
                    className="dot dot-active"
                    style={{ backgroundColor: "#b2b5b8" }}
                  ></span>
                  <span
                    className="dot"
                    style={{ backgroundColor: "#e3e4e5" }}
                  ></span>
                </div>
              </div>

              <div className="option-group">
                <label>Size</label>
                <select className="option-select">
                  <option>14-inch Liquid Retina XDR display</option>
                  <option>16-inch Liquid Retina XDR display</option>
                </select>
              </div>

              <div className="option-group">
                <label>Memory</label>
                <select className="option-select">
                  <option>16GB unified memory</option>
                  <option>32GB unified memory</option>
                </select>
              </div>

              <div className="option-group">
                <label>Storage</label>
                <select className="option-select">
                  <option>1TB SSD Storage</option>
                  <option>2TB SSD Storage</option>
                </select>
              </div>
            </div>

            {/* MIQDOR VA TUGMALAR */}
            <div className="action-row">
              <div className="quantity-counter">
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                >
                  -
                </button>
                <span>{String(quantity).padStart(2, "0")}</span>
                <button onClick={() => setQuantity((prev) => prev + 1)}>
                  +
                </button>
              </div>

              <button className="add-to-cart-btn" onClick={handleAddToCart}>
                ADD TO CART <FaShoppingCart />
              </button>

              <button className="buy-now-btn">BUY NOW</button>
            </div>

            <div className="secondary-actions">
              <button className="text-btn">
                <FaHeart /> Add to Wishlist
              </button>
              <button className="text-btn">
                <FaExchangeAlt /> Add to Compare
              </button>
              <div className="share-box">
                <span>Share product:</span>
                <button>
                  <FaCopy />
                </button>
                <button>
                  <FaFacebookF />
                </button>
                <button>
                  <FaTwitter />
                </button>
                <button>
                  <FaPinterestP />
                </button>
              </div>
            </div>

            {/* TO'LOV TIZIMLARI */}
            <div className="checkout-guarantee">
              <p>100% Guarantee Safe Checkout</p>
              <div className="payment-icons">
                <span className="pay-badge visa">VISA</span>
                <span className="pay-badge paypal">PayPal</span>
                <span className="pay-badge mastercard">MasterCard</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuickViewModal;
