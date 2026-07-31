import { useEffect, useState } from "react";
import { LuArrowRight } from "react-icons/lu";
import { FaGooglePlay, FaApple } from "react-icons/fa";
import { getFooterCategories } from "../../api/footerApi";
import "./Footer.css";

const defaultCategories = [
  "Computer & Laptop",
  "SmartPhone",
  "Headphone",
  "Accessories",
  "Camera & Photo",
  "TV & Homes",
];

const popularTags = [
  "Game",
  "iPhone",
  "TV",
  "Asus Laptops",
  "Macbook",
  "SSD",
  "Graphics Card",
  "Power Bank",
  "Smart TV",
  "Speaker",
  "Tablet",
  "Microwave",
  "Samsung",
];

function Footer() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getFooterCategories().then((data) => {
      if (data && data.length > 0) {
        setCategories(data);
      } else {
        setCategories(defaultCategories);
      }
    });
  }, []);

  const formatCatName = (item) => {
    if (typeof item === "object" && item !== null) {
      return item.name || item.slug;
    }
    if (typeof item === "string") {
      return item.charAt(0).toUpperCase() + item.slice(1).replace("-", " ");
    }
    return item;
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col brand-col">
            <div className="footer-logo">
              <span className="logo-icon">
                <span className="logo-inner-circle"></span>
              </span>
              <span className="logo-text">CLICON</span>
            </div>

            <p className="contact-label">Customer Supports:</p>
            <h4 className="phone-number">(629) 555-0129</h4>
            <p className="address">
              4517 Washington Ave. <br />
              Manchester, Kentucky 39495
            </p>
            <a href="mailto:info@kinbo.com" className="email-link">
              info@kinbo.com
            </a>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">TOP CATEGORY</h4>
            <ul className="footer-links">
              {categories.map((cat, index) => (
                <li key={index}>
                  <a
                    href={`/category/${typeof cat === "object" ? cat.slug : cat}`}
                  >
                    {formatCatName(cat)}
                  </a>
                </li>
              ))}
              <li>
                <a href="/shop" className="browse-all">
                  Browse All Product <LuArrowRight />
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">QUICK LINKS</h4>
            <ul className="footer-links">
              <li>
                <a href="/shop">Shop Product</a>
              </li>
              <li>
                <a href="/cart">Shoping Cart</a>
              </li>
              <li>
                <a href="/wishlist">Wishlist</a>
              </li>
              <li>
                <a href="/coming-soon">Compare</a>
              </li>
              <li>
                <a href="/track-order">Track Order</a>
              </li>
              <li>
                <a href="/customer-support">Customer Help</a>
              </li>
              <li>
                <a href="/coming-soon">About Us</a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">DOWNLOAD APP</h4>
            <div className="app-buttons">
              <a href="#playstore" className="app-btn">
                <FaGooglePlay className="app-icon" />
                <div className="app-btn-text">
                  <span>Get it now</span>
                  <strong>Google Play</strong>
                </div>
              </a>

              <a href="#appstore" className="app-btn">
                <FaApple className="app-icon apple-icon" />
                <div className="app-btn-text">
                  <span>Get it now</span>
                  <strong>App Store</strong>
                </div>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">POPULAR TAG</h4>
            <div className="tag-cloud">
              {popularTags.map((tag, index) => (
                <span
                  key={index}
                  className={`tag-item ${tag === "" ? "active-tag" : ""}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>Kinbo - eCommerce Template © 2021. Design by Templatecookie</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
