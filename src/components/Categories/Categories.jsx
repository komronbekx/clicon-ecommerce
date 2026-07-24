import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import { getCategories } from "../../api/productApi";

import "swiper/css";
import "swiper/css/navigation";
import "./Categories.css";

function Categories() {
  const [categoriesWithImages, setCategoriesWithImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategoriesData() {
      try {
        // 1. Kategoriyalar ro'yxatini olamiz
        const data = await getCategories();

        // 2. Har bir kategoriya uchun unga tegishli 1-mahsulot rasmini API'dan tortamiz
        const formattedData = await Promise.all(
          data.map(async (item) => {
            const slug = typeof item === "string" ? item : item.slug;
            const name = typeof item === "string" ? item : item.name;

            try {
              // Shu kategoriyadagi 1-mahsulotni olamiz
              const res = await fetch(
                `https://dummyjson.com/products/category/${slug}?limit=1`,
              );
              const catData = await res.json();

              return {
                name: name,
                slug: slug,
                image:
                  catData.products?.[0]?.thumbnail ||
                  catData.products?.[0]?.images?.[0],
              };
            } catch (error) {
              return { name: name, slug: slug, image: "" };
            }
          }),
        );

        setCategoriesWithImages(formattedData);
        setLoading(false);
      } catch (err) {
        console.error("Kategoriyalarni yuklashda xatolik:", err);
        setLoading(false);
      }
    }

    loadCategoriesData();
  }, []);

  if (loading) {
    return (
      <div className="categories-loading">Kategoriyalar yuklanmoqda...</div>
    );
  }

  return (
    <section className="categories-section">
      <div className="container">
        <h2 className="categories-title">Shop with Categorys</h2>

        <div className="slider-wrapper">
          <Swiper
            modules={[Navigation]}
            spaceBetween={16}
            slidesPerView={6}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            breakpoints={{
              320: { slidesPerView: 2 },
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 6 },
            }}
            className="categories-swiper"
          >
            {categoriesWithImages.map((item, index) => (
              <SwiperSlide key={item.slug || index}>
                <div className="category-card">
                  <div className="category-img">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <p>{item.name}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button className="custom-prev nav-btn">←</button>
          <button className="custom-next nav-btn">→</button>
        </div>
      </div>
    </section>
  );
}

export default Categories;
