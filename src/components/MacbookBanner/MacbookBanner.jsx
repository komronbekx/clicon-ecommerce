import React, { useEffect, useState } from "react";
import { getProducts } from "../../api/productApi";
import "./MacbookBanner.css";
import { useCart } from "../context/CartContext";

function MacbookBanner() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();

  useEffect(() => {
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
  }, []);

  const macbookProduct = {
    id: "macbook-pro-m1",
    title: "Macbook Pro (Apple M1 Max Chip)",
    price: 1999,
    image:
      "https://png.pngtree.com/png-vector/20230321/ourmid/pngtree-apple-macbook-pro-16-inch-png-image_6654817.png",
  };

  const flashSale = products.slice(0, 3);
  const bestSellers = products.slice(3, 6);
  const topRated = products.slice(6, 9);
  const newArrival = products.slice(9, 12);

  const MiniProductCard = ({ item }) => {
    const handleAddMini = () => {
      addToCart({
        id: item?.id,
        title: item?.title || item?.name || "Product Name",
        price: item?.price || 1500,
        image: item?.thumbnail || item?.image || item?.images?.[0],
      });
    };

    return (
      <div
        className="mini-product-card"
        onClick={handleAddMini}
        style={{ cursor: "pointer" }}
        title="Savatga qo'shish uchun bosing"
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
        <div className="macbook-banner">
          <div className="banner-text-side">
            <span className="save-badge">SAVE UP TO $200.00</span>
            <h1 className="macbook-title">Macbook Pro</h1>
            <p className="macbook-desc">
              Apple M1 Max Chip. 32GB Unified
              <br />
              Memory, 1TB SSD Storage
            </p>

            <button
              type="button"
              className="macbook-btn"
              onClick={() => addToCart(macbookProduct)}
            >
              SHOP NOW <span>→</span>
            </button>
          </div>

          <div className="banner-img-side">
            <div className="macbook-price-circle">$1999</div>

            <img
              src="https://png.pngtree.com/png-vector/20230321/ourmid/pngtree-apple-macbook-pro-16-inch-png-image_6654817.png"
              alt="Macbook Pro"
              className="macbook-img"
            />
          </div>
        </div>

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
