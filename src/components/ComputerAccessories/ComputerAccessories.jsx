import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../../api/productApi";
import ProductCard from "../ProductCard/ProductCard";
import { useQuickView } from "../context/QuickViewContext"; // 1. QuickView import
import "./ComputerAccessories.css";

const tabs = ["All Product", "beauty", "fragrances", "skin-care"];

function ComputerAccessories() {
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("All Product");
  const [loading, setLoading] = useState(true);
  const [bannerProduct, setBannerProduct] = useState(null);

  const { openQuickView } = useQuickView(); // 2. Hook'dan openQuickView olish

  useEffect(() => {
    getProducts()
      .then((data) => {
        const list = Array.isArray(data) ? data : data.products || [];
        setProducts(list);

        const beautyItem = list.find((item) => item.category === "beauty");
        if (beautyItem) {
          setBannerProduct(beautyItem);
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error("ComputerAccessories xatolik:", err);
        setLoading(false);
      });
  }, []);

  const displayedProducts =
    activeTab === "All Product"
      ? products
          .filter((item) =>
            ["beauty", "fragrances", "skin-care"].includes(item.category),
          )
          .slice(0, 8)
      : products.filter((item) => item.category === activeTab).slice(0, 8);

  const bannerImgSrc =
    bannerProduct?.images?.[0] ||
    bannerProduct?.thumbnail ||
    "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png";

  return (
    <section className="comp-accessories-section">
      <div className="container comp-accessories-container">
        <div className="comp-main-content">
          <div className="comp-header">
            <h2 className="comp-title">Beauty Products</h2>

            <div className="comp-tabs">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`comp-tab-btn ${
                    activeTab === tab ? "active" : ""
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === "All Product"
                    ? "All Product"
                    : tab
                        .replace(/-/g, " ")
                        .replace(/\b\w/g, (c) => c.toUpperCase())}
                </button>
              ))}

              <Link to="/shop" className="comp-browse-all">
                Browse All Product <span>→</span>
              </Link>
            </div>
          </div>

          {loading ? (
            <div className="loading-text">Yuklanmoqda...</div>
          ) : (
            <div className="comp-products-grid">
              {displayedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>

        <div className="comp-banners">
          {/* 1-BANNER (Yellow) */}
          <div className="side-banner yellow-banner">
            <div className="side-banner-img">
              <img
                src={bannerImgSrc}
                alt={bannerProduct?.title || "Beauty Product"}
              />
            </div>

            <h3 className="side-banner-title">
              Premium
              <br />
              Beauty Products
            </h3>

            <p className="side-banner-desc">
              Discover the best beauty &
              <br />
              skincare collection.
            </p>

            <div className="price-badge-box">
              <span>Only for:</span>
              <div className="price-tag-badge">
                ${bannerProduct?.price || 299} USD
              </div>
            </div>

            {/* SHOP NOW bosilganda birinchi banner mahsulotining QuickView'i ochiladi */}
            <button
              type="button"
              className="side-banner-btn orange-btn"
              onClick={() => bannerProduct && openQuickView(bannerProduct)}
            >
              SHOP NOW <span>→</span>
            </button>
          </div>

          {/* 2-BANNER (Dark Blue) */}
          <div className="side-banner darkblue-banner">
            <span className="summer-badge">SUMMER SALES</span>

            <h3 className="discount-title">37% DISCOUNT</h3>

            <p className="discount-desc">
              only for <span className="highlight-yellow">Beauty</span> product.
            </p>

            {/* SHOP NOW bosilganda mavjud mahsulotlar orasidan biri ochiladi */}
            <button
              type="button"
              className="side-banner-btn blue-btn"
              onClick={() =>
                displayedProducts.length > 0 &&
                openQuickView(displayedProducts[0])
              }
            >
              SHOP NOW <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ComputerAccessories;
