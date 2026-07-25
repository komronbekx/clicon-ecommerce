import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import { useCart } from "../context/CartContext";

function LeftSlider({ products }) {
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    if (!product) return;

    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images?.[0] || product.image,
    });
  };

  return (
    <div className="left-slider">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        {products?.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="slide">
              <div className="slide-content">
                <span className="slide-tag">THE BEST PLACE TO BUY</span>

                <h1>{product.title}</h1>

                <p>{product.description}</p>

                <button
                  type="button"
                  className="shop-btn"
                  onClick={() => handleAddToCart(product)}
                >
                  SHOP NOW →
                </button>
              </div>

              <div className="slide-image">
                <div className="price-circle">${product.price}</div>

                <img src={product.images?.[0]} alt={product.title} />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default LeftSlider;
