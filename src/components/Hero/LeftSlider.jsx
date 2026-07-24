import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

// 1. CartContext funksiyasini import qilamiz
import { useCart } from "../context/CartContext"; // CartContext manzilini to'g'ri ko'rsatganingizga ishonch hosil qiling

function LeftSlider({ products }) {
  // 2. addToCart funksiyasini olamiz
  const { addToCart } = useCart();

  // 3. Savatga to'g'ri ko'rinishda qo'shish funksiyasi
  const handleAddToCart = (product) => {
    if (!product) return;

    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      // Sliderdagi rasm formatiga moslaymiz:
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

                {/* 4. SHOP NOW TUGMASIGA onClick ADD TO CART ULAYMIZ */}
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
