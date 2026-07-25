import React from "react";
import "./Promobanners.css";

function PromoBanners() {
  return (
    <section className="promo-section">
      <div className="container promo-container">
        <div className="promo-card light-banner">
          <div className="promo-content">
            <span className="promo-badge blue-badge">INTRODUCING</span>
            <h2 className="promo-title">
              New Apple
              <br />
              Homepod Mini
            </h2>
            <p className="promo-desc">
              Jam-packed with innovation,
              <br />
              HomePod mini delivers unexpectedly.
            </p>
            <button className="promo-btn">
              SHOP NOW <span>→</span>
            </button>
          </div>

          <div className="promo-img">
            <img
              src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/homepod-mini-select-white-202110?wid=800&hei=800&fmt=jpeg&qlt=90&.v=1632925585000"
              alt="Apple Homepod Mini"
            />
          </div>
        </div>

        <div className="promo-card dark-banner">
          <div className="promo-content">
            <span className="promo-badge yellow-badge">INTRODUCING NEW</span>
            <h2 className="promo-title light-text">
              Xiaomi Mi 11 Ultra
              <br />
              12GB+256GB
            </h2>
            <p className="promo-note">
              *Data provided by internal
              <br />
              laboratories. Industry measurment.
            </p>
            <button className="promo-btn">
              SHOP NOW <span>→</span>
            </button>
          </div>

          <div className="promo-img-box">
            <div className="price-tag">$590</div>

            <img
              src="https://images.officialimages.co/products/images/large/xiaomi_mi_11_ultra_black.png"
              alt="Xiaomi Mi 11 Ultra"
              onError={(e) => {
                e.target.src =
                  "https://dummyjson.com/image/250x300/191c1f/ffffff?text=Xiaomi+Mi+11";
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default PromoBanners;
