import React, { useEffect, useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { getProducts } from "../api/productApi";
import ProductCard from "../components/ProductCard/ProductCard";
import "./ShopPage.css";

function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    "Electronics Devices",
  );

  useEffect(() => {
    getProducts()
      .then((data) => {
        const list = Array.isArray(data) ? data : data.products || [];
        setProducts(list);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Xatolik:", err);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter((p) =>
    (p.title || p.name || "").toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="shop-page">
      <div className="container shop-container">
        <aside className="shop-sidebar">
          <div className="filter-group">
            <h4 className="filter-title">Category</h4>
            <div className="filter-list">
              {[
                "Electronics Devices",
                "Computer & Laptop",
                "Computer Accessories",
                "Smart Phone",
                "Headphone",
                "Mobile Accessories",
                "Gaming Console",
              ].map((cat) => (
                <label key={cat} className="filter-item">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === cat}
                    onChange={() => setSelectedCategory(cat)}
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="filter-group">
            <h4 className="filter-title">Price Range</h4>
            <div className="filter-list">
              {[
                "All Price",
                "Under $20",
                "$25 to $100",
                "$100 to $300",
                "$300 to $500",
                "$500 to $1,000",
              ].map((price, idx) => (
                <label key={price} className="filter-item">
                  <input type="radio" name="price" defaultChecked={idx === 0} />
                  <span>{price}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h4 className="filter-title">Popular Brands</h4>
            <div
              className="filter-list"
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
            >
              {[
                "Apple",
                "Google",
                "Microsoft",
                "Samsung",
                "Dell",
                "HP",
                "Sony",
                "Panasonic",
              ].map((brand) => (
                <label key={brand} className="filter-item">
                  <input type="checkbox" />
                  <span>{brand}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h4 className="filter-title">Popular Tag</h4>
            <div className="tags-grid">
              {[
                "Game",
                "iPhone",
                "TV",
                "Asus Laptop",
                "Macbook",
                "SSD",
                "Graphics Card",
                "Power Bank",
                "Smart TV",
              ].map((tag) => (
                <button
                  key={tag}
                  className={`tag-btn ${tag === "Graphics Card" ? "active" : ""}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="sidebar-ad-banner">
            <img
              src="https://png.pngtree.com/png-vector/20230105/ourmid/pngtree-smart-watch-png-image_6552256.png"
              alt="Apple Watch"
            />
            <h4>
              Heavy on Features.
              <br />
              Light on Price.
            </h4>
            <p>
              Only for <strong>$299 USD</strong>
            </p>
            <button className="ad-btn">ADD TO CART ➔</button>
          </div>
        </aside>

        <main className="shop-main">
          <div className="shop-top-bar">
            <div className="search-input-box">
              <input
                type="text"
                placeholder="Search for anything..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch />
            </div>

            <div className="sort-box">
              <select>
                <option>Sort by: Most Popular</option>
                <option>Sort by: Price (Low to High)</option>
                <option>Sort by: Price (High to Low)</option>
              </select>
            </div>
          </div>

          <div className="active-filters-bar">
            <div className="active-pills">
              <span>Active Filters:</span>
              <div className="active-pill">
                {selectedCategory}{" "}
                <FaTimes onClick={() => setSelectedCategory("")} />
              </div>
              <div className="active-pill">
                5 Star Rating <FaTimes />
              </div>
            </div>
            <div className="results-count">
              <span>{filteredProducts.length}</span> Results found.
            </div>
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: "40px" }}>
              Mahsulotlar yuklanmoqda...
            </div>
          ) : (
            <div className="shop-products-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default ShopPage;
