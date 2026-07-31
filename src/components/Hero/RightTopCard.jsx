import { FaArrowRight } from "react-icons/fa";
import "./Hero.css";
import { useQuickView } from "../context/QuickViewContext";

function RightTopCard({ product }) {
  if (!product) return null;

  const { openQuickView } = useQuickView();

  return (
    <div className="right-top-card">
      <div className="card-content">
        <span className="card-tag">SUMMER SALE</span>

        <h3>{product.title}</h3>

        <p className="card-price">${product.price}</p>

        <button
          type="button"
          className="shop-btn"
          onClick={() => openQuickView(product)}
        >
          SHOP NOW <FaArrowRight />
        </button>
      </div>

      <div className="card-image">
        <img src={product.images?.[0] || product.image} alt={product.title} />
      </div>
    </div>
  );
}

export default RightTopCard;
