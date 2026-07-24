import { FaArrowRight } from "react-icons/fa";
import "./Hero.css";
// 1. CartContext'ni import qilamiz
import { useCart } from "../context/CartContext"; // Manzilni to'g'ri ko'rsatganingizga ishonch hosil qiling

function RightTopCard({ product }) {
  if (!product) return null;

  // 2. addToCart funksiyasini olamiz
  const { addToCart } = useCart();

  // 3. Savatga qo'shish funksiyasi
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      // Card'dagi rasm ko'rinishiga moslaymiz:
      image: product.images?.[0] || product.image,
    });
  };

  return (
    <div className="right-top-card">
      <div className="card-content">
        <span className="card-tag">SUMMER SALE</span>

        <h3>{product.title}</h3>

        <p className="card-price">${product.price}</p>

        {/* 4. SHOP NOW TUGMASIGA onClick ULAYMIZ */}
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
