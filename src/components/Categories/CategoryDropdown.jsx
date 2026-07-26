import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../api/productApi";
import "./CategoryDropdown.css";

function CategoryDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();

        if (Array.isArray(data)) {
          const formatted = data.map((item) => {
            const slug =
              typeof item === "string" ? item : item.slug || item.name;

            const rawName =
              typeof item === "string" ? item : item.name || item.slug;

            const name = rawName
              .replace(/-/g, " ")
              .replace(/\b\w/g, (l) => l.toUpperCase());

            return {
              slug,
              name,
            };
          });

          setCategories(formatted);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div
      className="category-dropdown-wrapper"
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        className={`category-toggle-btn ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="hamburger-icon">☰</span>
        <span>All Category</span>
        <span className={`arrow-icon ${isOpen ? "rotate" : ""}`}>▼</span>
      </button>

      {isOpen && (
        <ul className="vertical-category-list">
          {loading ? (
            <li className="category-loading">Yuklanmoqda...</li>
          ) : (
            categories.map((cat) => (
              <li
                key={cat.slug}
                className="category-item"
                onClick={() => setIsOpen(false)}
              >
                <Link
                  to={`/shop?category=${cat.slug}`}
                  onClick={() => setIsOpen(false)}
                >
                  {cat.name}
                </Link>{" "}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

export default CategoryDropdown;
