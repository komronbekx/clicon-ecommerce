import React, { useEffect, useState } from "react";
import { getProducts } from "../../api/productApi";
import ProductCard from "../ProductCard/ProductCard";
import "./ComputerAccessories.css";

const tabs = [
  "All Product",
  "Keyboard & Mouse",
  "Headphone",
  "Webcam",
  "Printer",
];

function ComputerAccessories() {
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("All Product");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((data) => {
        const list = Array.isArray(data) ? data : data.products || [];
        setProducts(list.slice(0, 8));
        setLoading(false);
      })
      .catch((err) => {
        console.error("ComputerAccessories xatolik:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="comp-accessories-section">
      <div className="container comp-accessories-container">
        <div className="comp-main-content">
          <div className="comp-header">
            <h2 className="comp-title">Computer Accessories</h2>

            <div className="comp-tabs">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`comp-tab-btn ${activeTab === tab ? "active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
              <a href="#browse" className="comp-browse-all">
                Browse All Product <span>→</span>
              </a>
            </div>
          </div>

          {loading ? (
            <div className="loading-text">Yuklanmoqda...</div>
          ) : (
            <div className="comp-products-grid">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>

        <div className="comp-banners">
          <div className="side-banner yellow-banner">
            <div className="side-banner-img">
              <img
                src="https://m.media-amazon.com/images/I/5135Y82xSGL._AC_SL1000_.jpg"
                alt="Xiaomi Earbuds"
              />
            </div>
            <h3 className="side-banner-title">
              Xiaomi True
              <br />
              Wireless Earbuds
            </h3>
            <p className="side-banner-desc">
              Escape the noise, It’s time to hear
              <br />
              the magic with Xiaomi Earbuds.
            </p>
            <div className="price-badge-box">
              <span>Only for:</span>
              <div className="price-tag-badge">$299 USD</div>
            </div>
            <button className="side-banner-btn orange-btn">
              SHOP NOW <span>→</span>
            </button>
          </div>

          <div className="side-banner darkblue-banner">
            <span className="summer-badge">SUMMER SALES</span>
            <h3 className="discount-title">37% DISCOUNT</h3>
            <p className="discount-desc">
              only for <span className="highlight-yellow">SmartPhone</span>{" "}
              product.
            </p>
            <button className="side-banner-btn blue-btn">
              SHOP NOW <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ComputerAccessories;
