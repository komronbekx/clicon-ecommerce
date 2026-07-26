import React from "react";
import { useCart } from "../context/CartContext";
import { useQuickView } from "../context/QuickViewContext";
import { useWishlist } from "../context/WishlistContext";
import { FiShoppingCart } from "react-icons/fi";
import { IoEyeOutline } from "react-icons/io5";

import { FaHeart, FaRegHeart } from "react-icons/fa";

function ProductCard({ product, big }) {
  const { addToCart } = useCart();
  const { openQuickView } = useQuickView();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isLiked = isInWishlist(product?.id);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images?.[0] || product.image,
    });
  };

  return (
    <div className={`product-card ${big ? "big-card" : ""}`}>
      <div className="badge">{big ? "32% OFF" : "HOT"}</div>

      <div className="image-box">
        <img src={product.images?.[0] || product.image} alt={product.title} />

        <div className="hover-icons">
          <button
            type="button"
            onClick={() => toggleWishlist(product)}
            style={{ color: isLiked ? "#ee5858" : "inherit" }}
          >
            {isLiked ? <FaHeart color="#ee5858" /> : <FaRegHeart />}
          </button>

          <button type="button" onClick={handleAddToCart}>
            <FiShoppingCart />
          </button>

          <button type="button" onClick={() => openQuickView(product)}>
            <IoEyeOutline />
          </button>
        </div>
      </div>

      <div className="rating">
        ★★★★★ <span>(52,677)</span>
      </div>

      <h4>{product.title}</h4>

      <div className="price-box">
        <span className="old">${product.price + 200}</span>
        <span className="price">${product.price}</span>
      </div>

      {big && (
        <div className="actions">
          <button
            type="button"
            onClick={() => toggleWishlist(product)}
            style={{ color: isLiked ? "#ee5858" : "inherit" }}
          >
            {isLiked ? <FaHeart color="#ee5858" /> : <FaRegHeart />}
          </button>

          <button type="button" className="cart" onClick={handleAddToCart}>
            <FiShoppingCart /> ADD TO CART
          </button>

          <button type="button" onClick={() => openQuickView(product)}>
            <IoEyeOutline />
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductCard;
