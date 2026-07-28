import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // 1. Link import qilindi
import {
  LuArrowRight,
  LuUser,
  LuCalendar,
  LuMessageSquare,
} from "react-icons/lu";
import "./LatestNews.css";

function LatestNews() {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://dummyjson.com/posts?limit=3")
      .then((res) => res.json())
      .then((data) => {
        setNewsList(data.posts || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("News yuklashda xatolik:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="latest-news-section">
        <div
          className="container"
          style={{ textAlign: "center", padding: "40px 0" }}
        >
          Yuklanmoqda...
        </div>
      </section>
    );
  }

  return (
    <section className="latest-news-section">
      <div className="container">
        <h2 className="section-title">Latest News</h2>

        <div className="news-grid">
          {newsList.map((item) => (
            <div className="news-card" key={item.id}>
              <div className="news-image-box">
                <img
                  src={`https://picsum.photos/seed/${item.id}/400/250`}
                  alt={item.title}
                />
              </div>

              <div className="news-content">
                <div className="news-meta">
                  <span>
                    <LuUser className="meta-icon" /> Admin
                  </span>
                  <span>
                    <LuCalendar className="meta-icon" /> 28-Iyul, 2026
                  </span>
                  <span>
                    <LuMessageSquare className="meta-icon" /> {item.views || 8}
                  </span>
                </div>

                {/* Sarlavha */}
                <h3 className="news-title">{item.title}</h3>

                {/* Description */}
                <p className="news-desc">
                  {item.body.length > 200
                    ? item.body.substring(0, 200) + "..."
                    : item.body}
                </p>

                {/* 2. <a> tegi o'rniga <Link to="..."> ishlatildi */}
                <Link to={`/news/${item.id}`} className="read-more-btn">
                  READ MORE <LuArrowRight className="btn-icon" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LatestNews;
