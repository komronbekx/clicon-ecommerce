import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  LuArrowLeft,
  LuUser,
  LuCalendar,
  LuMessageSquare,
} from "react-icons/lu";
import "./NewsDetail.css";

function NewsDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    fetch(`https://dummyjson.com/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("News yuklashda xatolik:", err);
        setLoading(false);
      });
  }, [id]);
  if (loading) {
    return (
      <div className="container news-detail-loading">
        <div className="spinner"></div>
        <p>Yangilik yuklanmoqda...</p>
      </div>
    );
  }

  return (
    <div className="news-detail-wrapper">
      <div className="container">
        <Link to="/" className="news-back-link">
          <LuArrowLeft /> Bosh sahifaga qaytish
        </Link>

        {post && !post.message ? (
          <article className="news-detail-card">
            <h1 className="news-detail-title">{post.title}</h1>

            <div className="news-detail-meta">
              <span>
                <LuUser /> Admin
              </span>
              <span>
                <LuCalendar /> 28-Iyul, 2026
              </span>
              <span>
                <LuMessageSquare /> {post.views || 12} ko'rishlar
              </span>
            </div>

            <div className="news-detail-image-box">
              <img
                src={`https://picsum.photos/seed/${post.id}/900/450`}
                alt={post.title}
              />
            </div>

            <div className="news-detail-content">
              <p className="lead-text">{post.body}</p>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>

              <blockquote>
                "Texnologiya va elektronika dunyosidagi eng so'nggi yangiliklar
                va trendlar bilan har doim xabardor bo'lib boring."
              </blockquote>

              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
              </p>
            </div>

            {post.tags && (
              <div className="news-detail-tags">
                <span>Teglar:</span>
                {post.tags.map((tag, idx) => (
                  <span key={idx} className="tag-badge">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </article>
        ) : (
          <div className="news-not-found">
            <h2>Xabar topilmadi!</h2>
            <p>Siz qidirayotgan yangilik o'chirilgan yoki mavjud emas.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default NewsDetail;
