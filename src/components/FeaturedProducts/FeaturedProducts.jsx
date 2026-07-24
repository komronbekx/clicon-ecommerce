import React, { useEffect, useState } from "react";
import { getProducts } from "../../api/productApi"; // Mahsulotlarni oluvchi API funksiyangiz
import ProductCard from "../ProductCard/ProductCard"; // Mavjud ProductCard komponentingiz
import "./FeaturedProducts.css";

const tabs = ["All Product", "Smart Phone", "Laptop", "Headphone", "TV"];

function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("All Product");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // API'dan mahsulotlarni olamiz
    getProducts()
      .then((data) => {
        // Ma'lumot tayyorligiga qarab Array yoki Object formatini tekshiramiz
        const list = Array.isArray(data) ? data : data.products || [];
        setProducts(list);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Featured Products xatolik:", err);
        setLoading(false);
      });
  }, []);

  // Aynan 8 ta mahsulotni olamiz
  const displayedProducts = products.slice(0, 8);

  return (
    <section className="featured-section">
      <div className="container featured-container">
        {/* CHAP BANNER */}
        <div className="featured-banner">
          <div className="banner-content">
            <span className="banner-subtitle">COMPUTER & ACCESSORIES</span>
            <h3 className="banner-title">32% Discount</h3>
            <p className="banner-desc">For all electronics products</p>

            <div className="banner-badge-box">
              <span>Offers ends in:</span>
              <div className="banner-badge">ENDS OF CHRISTMAS</div>
            </div>

            <button className="banner-btn">
              SHOP NOW <span>→</span>
            </button>
          </div>
          <div className="banner-img">
            <img
              src="https://images.unsplash.com/photo-1526738549149-8e07eca6c147?q=80&w=600&auto=format&fit=crop"
              alt="Discount Banner"
            />
          </div>
        </div>

        {/* O'NG MAHSULOTLAR TESHGICHI (GRID) */}
        <div className="featured-content">
          {/* Sarlavha va Tablar */}
          <div className="featured-header">
            <h2 className="featured-title">Featured Products</h2>

            <div className="featured-tabs">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`tab-btn ${activeTab === tab ? "active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
              <a href="#all" className="browse-all">
                Browse All Product <span>→</span>
              </a>
            </div>
          </div>

          {/* 8 ta Mahsulot Grid */}
          {loading ? (
            <div className="loading-text">Yuklanmoqda...</div>
          ) : (
            <div className="featured-grid">
              {displayedProducts.map((product) => (
                // O'zingizdagi ProductCard ishlatiladi
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;
