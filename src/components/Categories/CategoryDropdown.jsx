import React, { useEffect, useState } from "react";
import { getCategories } from "../../api/productApi";
import "./CategoryDropdown.css";

function CategoryDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getCategories();
        console.log("API'dan kelgan data:", data);

        if (Array.isArray(data)) {
          const formattedCategories = data.map((item) => {
            const slug =
              typeof item === "string" ? item : item.slug || item.name;
            let name = typeof item === "string" ? item : item.name || item.slug;

            if (name) {
              name =
                name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, " ");
            }

            return { name, slug };
          });

          setCategories(formattedCategories);
        }
      } catch (error) {
        console.error("Kategoriyalarni yuklashda xatolik:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="category-dropdown-wrapper">
      <button
        type="button"
        className={`category-toggle-btn ${isOpen ? "active" : ""}`}
        onClick={toggleMenu}
      >
        <span className="hamburger-icon">☰</span>
        <span>All Category</span>
        <span className={`arrow-icon ${isOpen ? "rotate" : ""}`}>▼</span>
      </button>

      {isOpen && (
        <ul className="vertical-category-list">
          {loading ? (
            <li className="category-loading">Yuklanmoqda...</li>
          ) : categories.length > 0 ? (
            categories.map((cat, index) => (
              <li key={cat.slug || index} className="category-item">
                <a href={`/category/${cat.slug}`}>{cat.name}</a>
              </li>
            ))
          ) : (
            <li className="category-loading">Kategoriya topilmadi</li>
          )}
        </ul>
      )}
    </div>
  );
}

export default CategoryDropdown;
