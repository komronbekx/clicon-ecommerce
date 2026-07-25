import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import "./Header.css";
import {
  FaBars,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaHeadset,
  FaInfoCircle,
  FaRandom,
} from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";

import { getCategories } from "../../api/productApi";

function CategoryBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getCategories();
        if (Array.isArray(data)) {
          const formatted = data.map((item) => {
            const slug =
              typeof item === "string" ? item : item.slug || item.name;
            let name = typeof item === "string" ? item : item.name || item.slug;

            if (name) {
              name =
                name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, " ");
            }
            return { name, slug };
          });
          setCategories(formatted);
        }
      } catch (error) {
        console.error("Kategoriyalar yuklanmadi:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return (
    <div className="category-bar">
      <div className="container category-content">
        <div className="category-left">
          <div
            className="category-dropdown-container"
            onMouseLeave={() => setIsOpen(false)}
          >
            <button
              type="button"
              className={`category-btn ${isOpen ? "active" : ""}`}
              onClick={() => setIsOpen(!isOpen)}
            >
              <FaBars />
              <span>All Category</span>
              <IoChevronDown
                className={`arrow-icon ${isOpen ? "rotate" : ""}`}
              />
            </button>

            {isOpen && (
              <ul className="vertical-category-list">
                {loading ? (
                  <li className="category-loading">Yuklanmoqda...</li>
                ) : categories.length > 0 ? (
                  categories.map((cat, idx) => (
                    <li key={cat.slug || idx} className="category-item">
                      <Link
                        to={`/shop?category=${cat.slug}`}
                        onClick={() => setIsOpen(false)}
                      >
                        {cat.name}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="category-loading">Kategoriya topilmadi</li>
                )}
              </ul>
            )}
          </div>

          <Link to="/track-order">
            <FaMapMarkerAlt />
            Track Order
          </Link>

          <Link to="/compare">
            <FaRandom />
            Compare
          </Link>

          <Link to="/support">
            <FaHeadset />
            Customer Support
          </Link>

          <Link to="/help">
            <FaInfoCircle />
            Need Help
          </Link>
        </div>

        <div className="category-phone">
          <FaPhoneAlt />
          <span>+1-202-555-0104</span>
        </div>
      </div>
    </div>
  );
}

export default CategoryBar;
