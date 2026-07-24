import { useEffect, useState } from "react";
import { getProducts } from "../../api/productApi";
import ProductCard from "../ProductCard/ProductCard";
import "./BestDeals.css";

function BestDeals() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data.slice(0, 9));
    });
  }, []);

  return (
    <section className="deals-section">
      {/* Shu container ramkani o'ziga oladi va 1320px ga tenglashadi */}
      <div className="container deals-container">
        <div className="deals-header">
          <h2>Best Deals</h2>

          <div className="timer">
            Deals ends in
            <span>16d : 21h : 57m</span>
          </div>

          <a href="#">Browse All Product →</a>
        </div>

        <div className="products-grid">
          {products.map((item, index) => (
            <ProductCard key={item.id} product={item} big={index === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default BestDeals;
