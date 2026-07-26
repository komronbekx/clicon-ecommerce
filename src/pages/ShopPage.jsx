import React, { useEffect, useState, useMemo } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { getProducts } from "../api/productApi";
import ProductCard from "../components/ProductCard/ProductCard";
import "./ShopPage.css";

const CATEGORIES = ["Beauty", "Fragrances", "Furniture", "Groceries"];

const PRICE_RANGES = [
  { label: "All Price", min: 0, max: Infinity },
  { label: "Under $20", min: 0, max: 20 },
  { label: "$25 to $100", min: 25, max: 100 },
  { label: "$100 to $300", min: 100, max: 300 },
  { label: "$300 to $500", min: 300, max: 500 },
  { label: "$500 to $1,000", min: 500, max: 1000 },
];

const BRANDS = [
  "Apple",
  "Google",
  "Microsoft",
  "Samsung",
  "Dell",
  "HP",
  "Sony",
  "Panasonic",
];

const TAGS = [
  "Game",
  "iPhone",
  "TV",
  "Asus Laptop",
  "Macbook",
  "SSD",
  "Graphics Card",
  "Power Bank",
  "Smart TV",
];

function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All Price");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");
  const [sortBy, setSortBy] = useState("popular");

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

  const handleBrandChange = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  const clearAllFilters = () => {
    setSelectedCategory("");
    setSelectedPriceRange("All Price");
    setSelectedBrands([]);
    setSelectedTag("");
    setSearchTerm("");
  };

  const hasActiveFilters = useMemo(() => {
    return (
      selectedCategory !== "" ||
      selectedPriceRange !== "All Price" ||
      selectedBrands.length > 0 ||
      selectedTag !== "" ||
      searchTerm !== ""
    );
  }, [
    selectedCategory,
    selectedPriceRange,
    selectedBrands,
    selectedTag,
    searchTerm,
  ]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const title = (p.title || p.name || "").toLowerCase();
        const category = p.category || "";
        const brand = p.brand || "";
        const price = p.price || 0;
        const tags = p.tags || p.tag || [];

        if (searchTerm && !title.includes(searchTerm.toLowerCase()))
          return false;

        if (
          selectedCategory &&
          category.toLowerCase() !== selectedCategory.toLowerCase()
        )
          return false;

        const priceConfig = PRICE_RANGES.find(
          (r) => r.label === selectedPriceRange,
        );
        if (priceConfig && (price < priceConfig.min || price > priceConfig.max))
          return false;

        if (
          selectedBrands.length > 0 &&
          !selectedBrands.some((b) =>
            brand.toLowerCase().includes(b.toLowerCase()),
          )
        ) {
          return false;
        }

        if (selectedTag) {
          const tagMatch = Array.isArray(tags)
            ? tags.some((t) => t.toLowerCase() === selectedTag.toLowerCase())
            : title.toLowerCase().includes(selectedTag.toLowerCase());
          if (!tagMatch) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "low-high") return a.price - b.price;
        if (sortBy === "high-low") return b.price - a.price;
        return 0;
      });
  }, [
    products,
    searchTerm,
    selectedCategory,
    selectedPriceRange,
    selectedBrands,
    selectedTag,
    sortBy,
  ]);

  return (
    <div className="shop-page">
      <div className="container shop-container">
        <aside className="shop-sidebar">
          <div className="filter-group">
            <h4 className="filter-title">Category</h4>
            <div className="filter-list">
              {CATEGORIES.map((cat) => (
                <label key={cat} className="filter-item">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === cat}
                    onChange={() =>
                      setSelectedCategory(selectedCategory === cat ? "" : cat)
                    }
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h4 className="filter-title">Price Range</h4>
            <div className="filter-list">
              {PRICE_RANGES.map((price) => (
                <label key={price.label} className="filter-item">
                  <input
                    type="radio"
                    name="price"
                    checked={selectedPriceRange === price.label}
                    onChange={() => setSelectedPriceRange(price.label)}
                  />
                  <span>{price.label}</span>
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
              {BRANDS.map((brand) => (
                <label key={brand} className="filter-item">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                  />
                  <span>{brand}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h4 className="filter-title">Popular Tag</h4>
            <div className="tags-grid">
              {TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className={`tag-btn ${selectedTag === tag ? "active" : ""}`}
                  onClick={() => setSelectedTag(selectedTag === tag ? "" : tag)}
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
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="popular">Sort by: Most Popular</option>
                <option value="low-high">Sort by: Price (Low to High)</option>
                <option value="high-low">Sort by: Price (High to Low)</option>
              </select>
            </div>
          </div>

          {hasActiveFilters && (
            <div className="active-filters-bar">
              <div className="active-pills">
                <span>Active Filters:</span>

                {selectedCategory && (
                  <div className="active-pill">
                    {selectedCategory}{" "}
                    <FaTimes onClick={() => setSelectedCategory("")} />
                  </div>
                )}

                {selectedPriceRange !== "All Price" && (
                  <div className="active-pill">
                    {selectedPriceRange}{" "}
                    <FaTimes
                      onClick={() => setSelectedPriceRange("All Price")}
                    />
                  </div>
                )}

                {selectedBrands.map((brand) => (
                  <div key={brand} className="active-pill">
                    {brand} <FaTimes onClick={() => handleBrandChange(brand)} />
                  </div>
                ))}

                {selectedTag && (
                  <div className="active-pill">
                    {selectedTag} <FaTimes onClick={() => setSelectedTag("")} />
                  </div>
                )}

                <button
                  type="button"
                  onClick={clearAllFilters}
                  style={{
                    border: "none",
                    background: "transparent",
                    color: "#ee5858",
                    cursor: "pointer",
                    fontSize: "13px",
                    fontWeight: "600",
                    marginLeft: "8px",
                  }}
                >
                  Clear All
                </button>
              </div>

              <div className="results-count">
                <span>{filteredProducts.length}</span> Results found.
              </div>
            </div>
          )}

          {loading ? (
            <div style={{ textAlign: "center", padding: "40px" }}>
              Mahsulotlar yuklanmoqda...
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="shop-products-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div
              style={{ textAlign: "center", padding: "60px", color: "#5f6c72" }}
            >
              Afsuski, tanlangan filterlar bo'yicha hech qanday mahsulot
              topilmadi.
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default ShopPage;
