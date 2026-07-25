import { FaArrowRight } from "react-icons/fa";
import "./Hero.css";
import { useCart } from "../context/CartContext";

function RightTopCard({ product }) {
  if (!product) return null;

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images?.[0] || product.image,
    });
  };

  return (
    <div className="right-top-card">
      <div className="card-content">
        <span className="card-tag">SUMMER SALE</span>

        <h3>{product.title}</h3>

        <p className="card-price">${product.price}</p>

        <button type="button" className="shop-btn" onClick={handleAddToCart}>
          SHOP NOW <FaArrowRight />
        </button>
      </div>

      <div className="card-image">
        <img src={product.images?.[0]} alt={product.title} />
      </div>
    </div>
  );
}

export default RightTopCard;
