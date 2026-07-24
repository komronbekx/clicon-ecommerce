import { useEffect, useState } from "react";
import "./Hero.css";

import { getHeroProducts } from "../../api/productApi";

import LeftSlider from "./LeftSlider";
import RightTopCard from "./RightTopCard";
import RightBottomCard from "./RightBottomCard";
import Features from "./Features";
function Hero() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const data = await getHeroProducts();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchHero();
  }, []);

  if (products.length === 0) return <h2>Loading...</h2>;

  return (
    <section className="hero">
      <div className="container hero-content">
        <LeftSlider products={products.slice(0, 3)} />

        <div className="hero-right">
          <RightTopCard product={products[3]} />
          <RightBottomCard product={products[4]} />
        </div>
      </div>
      <Features />
    </section>
  );
}

export default Hero;
