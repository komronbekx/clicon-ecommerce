import { useEffect, useState } from "react";
import { getProducts } from "../../api/productApi";
import "./MacbookBanner.css";
import { useQuickView } from "../context/QuickViewContext"; // 1. Context import qilamiz

function MacbookBanner() {
  const [products, setProducts] = useState([]);
  const [macbookProduct, setMacbookProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { openQuickView } = useQuickView(); // 2. Hook'dan openQuickView olamiz

  useEffect(() => {
    // 12 ta mahsulotni pastdagi 4 ta ustun uchun olamiz
    getProducts()
      .then((data) => {
        const list = Array.isArray(data) ? data : data.products || [];
        setProducts(list.slice(0, 12));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Xatolik:", err);
        setLoading(false);
      });

    // Macbook ma'lumotlarini olish
    fetch("https://dummyjson.com/products/search?q=macbook")
      .then((res) => res.json())
      .then((data) => {
        if (data.products && data.products.length > 0) {
          setMacbookProduct(data.products[0]);
        }
      })
      .catch((err) => console.error("Macbook olishda xatolik:", err));
  }, []);

  const macbookImage =
    macbookProduct?.thumbnail ||
    macbookProduct?.images?.[0] ||
    macbookProduct?.image ||
    "https://png.pngtree.com/png-vector/20230321/ourmid/pngtree-apple-macbook-pro-16-inch-png-image_6654817.png";

  const flashSale = products.slice(0, 3);
  const bestSellers = products.slice(3, 6);
  const topRated = products.slice(6, 9);
  const newArrival = products.slice(9, 12);

  // 3. Mini-card bosilganda QuickView ochilishi uchun to'g'rilangan komponent:
  const MiniProductCard = ({ item }) => {
    return (
      <div
        className="mini-product-card"
        onClick={() => openQuickView(item)}
        style={{ cursor: "pointer" }}
        title="Quick View oynasini ochish"
      >
        <div className="mini-card-img">
          <img
            src={item?.thumbnail || item?.image || item?.images?.[0]}
            alt={item?.title || item?.name}
          />
        </div>
        <div className="mini-card-info">
          <p className="mini-card-title">
            {item?.title || item?.name || "Product Name"}
          </p>
          <span className="mini-card-price">${item?.price || 1500}</span>
        </div>
      </div>
    );
  };

  return (
    <section className="macbook-section">
      <div className="container">
        {/* TOP BANNER */}
        <div className="macbook-banner">
          <div className="banner-text-side">
            <span className="save-badge">SAVE UP TO $200.00</span>

            <h1 className="macbook-title">
              {macbookProduct?.title || "Macbook Pro"}
            </h1>

            <p className="macbook-desc">
              {macbookProduct?.description ||
                "Apple M1 Max Chip. 32GB Unified Memory, 1TB SSD Storage"}
            </p>

            <button
              type="button"
              className="macbook-btn"
              onClick={() => macbookProduct && openQuickView(macbookProduct)}
            >
              SHOP NOW <span>→</span>
            </button>
          </div>

          <div className="banner-img-side">
            <div className="macbook-price-circle">
              ${macbookProduct?.price || 1999}
            </div>

            <img
              src={macbookImage}
              alt={macbookProduct?.title || "Macbook Pro"}
              className="macbook-img"
            />
          </div>
        </div>

        {/* 4 TA USTUNLI MINI KARTALAR (Rasmda ko'rsatilgan bo'lim) */}
        <div className="mini-products-grid">
          <div className="mini-column">
            <h3 className="column-title">FLASH SALE TODAY</h3>
            {loading ? (
              <div>Yuklanmoqda...</div>
            ) : (
              flashSale.map((p) => <MiniProductCard key={p.id} item={p} />)
            )}
          </div>

          <div className="mini-column">
            <h3 className="column-title">BEST SELLERS</h3>
            {loading ? (
              <div>Yuklanmoqda...</div>
            ) : (
              bestSellers.map((p) => <MiniProductCard key={p.id} item={p} />)
            )}
          </div>

          <div className="mini-column">
            <h3 className="column-title">TOP RATED</h3>
            {loading ? (
              <div>Yuklanmoqda...</div>
            ) : (
              topRated.map((p) => <MiniProductCard key={p.id} item={p} />)
            )}
          </div>

          <div className="mini-column">
            <h3 className="column-title">NEW ARRIVAL</h3>
            {loading ? (
              <div>Yuklanmoqda...</div>
            ) : (
              newArrival.map((p) => <MiniProductCard key={p.id} item={p} />)
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default MacbookBanner;
