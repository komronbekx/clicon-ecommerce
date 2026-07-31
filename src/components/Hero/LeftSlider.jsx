import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import { useCart } from "../context/CartContext";
import { useQuickView } from "../context/QuickViewContext"; // 1. QuickView import qilamiz

function LeftSlider({ products }) {
  const { addToCart } = useCart();
  const { openQuickView } = useQuickView(); // 2. Hook'dan openQuickView funksiyasini olamiz

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

                {/* 3. onClick orqali QuickView funksiyasini ulash */}
                <button
                  type="button"
                  className="shop-btn"
                  onClick={() => openQuickView(product)}
                >
                  SHOP NOW →
                </button>
              </div>

              <div className="slide-image">
                <div className="price-circle">${product.price}</div>

                <img
                  src={product.images?.[0] || product.image}
                  alt={product.title}
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default LeftSlider;
