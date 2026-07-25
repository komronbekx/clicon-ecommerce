import React, { useEffect, useState } from "react";
import { HiOutlineUserCircle } from "react-icons/hi";
import { HiCalendarDays } from "react-icons/hi2";
import { AiOutlineMessage } from "react-icons/ai";
import { LuArrowRight } from "react-icons/lu";
import { getLatestNews } from "../../api/newsApi";
import "./LatestNews.css";

const fallbackImages = [
  "https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop",
];

function LatestNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLatestNews(3)
      .then((data) => {
        setNews(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Yangiliklarni yuklashda xatolik:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="news-loading">Yangiliklar yuklanmoqda...</div>;
  }

  return (
    <section className="news-section">
      <div className="container">
        <h2 className="news-main-title">Latest News</h2>

        <div className="news-grid">
          {news.map((item, index) => (
            <div className="news-card" key={item.id}>
              <div className="news-img-box">
                <img
                  src={fallbackImages[index % fallbackImages.length]}
                  alt={item.title}
                />
              </div>

              <div className="news-content">
                <div className="news-meta">
                  <span className="meta-item">
                    <HiOutlineUserCircle className="meta-icon" /> Kristin
                  </span>
                  <span className="meta-item">
                    <HiCalendarDays className="meta-icon" /> 19 Dec, 2023
                  </span>
                  <span className="meta-item">
                    <AiOutlineMessage className="meta-icon" />{" "}
                    {item.views || 453}
                  </span>
                </div>

                <h3 className="news-card-title">{item.title}</h3>
                <p className="news-card-desc">{item.body}</p>

                <button className="read-more-btn">
                  READ MORE <LuArrowRight className="btn-icon" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LatestNews;
