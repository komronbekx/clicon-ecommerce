import React, { useEffect, useState } from "react";
import { getProducts } from "../../api/productApi";
import ProductCard from "../ProductCard/ProductCard";
import "./FeaturedProducts.css";

const tabs = [
  "All Product",
  "Beauty",
  "Fragrances",
  "Furniture",
  "Groceries",
];
const categoryMap = {
  Beauty: "beauty",
  Fragrances: "fragrances",
  Furniture: "furniture",
  Groceries: "groceries",
};

function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("All Product");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        const list = Array.isArray(data) ? data : data.products;
        setProducts(list);
      } catch (error) {
        console.error("Featured Products Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts =
    activeTab === "All Product"
      ? products
      : products.filter((item) => item.category === categoryMap[activeTab]);

  return (
    <section className="featured-section">
      <div className="container featured-container">
        {/* LEFT BANNER */}
        <div className="featured-banner">
          <div className="banner-content">
            <span className="banner-subtitle">COMPUTER & ACCESSORIES</span>

            <h3 className="banner-title">32% Discount</h3>

            <p className="banner-desc">For all electronics products</p>

            <div className="banner-badge-box">
              <span>Offers ends in:</span>

              <div className="banner-badge">ENDS OF CHRISTMAS</div>
            </div>

            <button className="banner-btn">SHOP NOW →</button>
          </div>

          <div className="banner-img">
            <img
              src="https://images.unsplash.com/photo-1526738549149-8e07eca6c147?q=80&w=600&auto=format&fit=crop"
              alt="Banner"
            />
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="featured-content">
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

              <a href="/" className="browse-all">
                Browse All Product →
              </a>
            </div>
          </div>

          {loading ? (
            <div className="loading-text">Loading...</div>
          ) : (
            <div className="featured-grid">
              {filteredProducts.slice(0, 8).map((product) => (
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
