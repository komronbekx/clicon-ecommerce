import { useEffect, useRef, useState } from "react";
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
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Kategoriyalarni olishda xatolik:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="category-bar">
      <div className="container category-content">
        <div className="category-left">
          <div className="category-dropdown-container" ref={dropdownRef}>
            <button
              className={`category-btn ${isOpen ? "active" : ""}`}
              onClick={() => setIsOpen(!isOpen)}
            >
              {" "}
              <FaBars />
              <span>All Category</span>
              <IoChevronDown
                className={isOpen ? "arrow-icon rotate" : "arrow-icon"}
              />
            </button>

            {isOpen && (
              <ul className="vertical-category-list">
                {categories.map((category, index) => (
                  <li key={category.slug || index} className="category-item">
                    <Link
                      to={`/shop?category=${category.slug}`}
                      onClick={() => setIsOpen(false)}
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Link to="/track-order">
            <FaMapMarkerAlt />
            Track Order
          </Link>

          <Link to="/coming-soon">
            <FaRandom />
            Compare
          </Link>

          <Link to="/customer-support">
            <FaHeadset />
            Customer Support
          </Link>

          <Link to="/coming-soon">
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
