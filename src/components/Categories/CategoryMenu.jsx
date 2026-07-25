import React, { useEffect, useState } from "react";
import { LuChevronDown, LuMenu } from "react-icons/lu";
import { getCategories } from "../../api/productApi";
import "./Categories.css";

function CategoryMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getCategories();
        const formattedCategories = data.map((item) => {
          const slug = typeof item === "string" ? item : item.slug;
          let name = typeof item === "string" ? item : item.name;
          name = name.charAt(0).toUpperCase() + name.slice(1).replace("-", " ");
          return { name, slug };
        });

        setCategories(formattedCategories);
      } catch (error) {
        console.error("Kategoriyalarni yuklashda xatolik:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return (
    <div
      className="category-dropdown-wrapper"
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className={`top-category-btn ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
      >
        <LuMenu className="menu-icon" />
        <span>All Category</span>
        <LuChevronDown className={`arrow-icon ${isOpen ? "rotate" : ""}`} />
      </button>

      {isOpen && (
        <ul className="vertical-category-list">
          {loading ? (
            <li className="category-loading">Yuklanmoqda...</li>
          ) : (
            categories.map((cat, index) => (
              <li key={cat.slug || index} className="category-item">
                <a href={`/category/${cat.slug}`}>{cat.name}</a>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

export default CategoryMenu;
