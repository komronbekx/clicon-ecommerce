import { useState } from "react";
import "./Header.css";
import {
  FaTwitter,
  FaFacebookF,
  FaPinterestP,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";

function TopBar() {
  const [lang, setLang] = useState("Eng");
  const [currency, setCurrency] = useState("USD");

  const [langOpen, setLangOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);

  return (
    <div className="topbar">
      <div className="container topbar-content">
        <p>Welcome to Clicon online eCommerce store.</p>

        <div className="topbar-right">
          <span>Follow us:</span>

          <FaTwitter />
          <FaFacebookF />
          <FaPinterestP />
          <FaInstagram />
          <FaYoutube />

          <div className="dropdown">
            <button
              className="dropdown-btn"
              onClick={() => {
                setLangOpen(!langOpen);
                setCurrencyOpen(false);
              }}
            >
              {lang}
              <IoChevronDown />
            </button>

            {langOpen && (
              <ul className="dropdown-menu">
                {["English", "Uzbek", "Russian"].map((item) => (
                  <li
                    key={item}
                    onClick={() => {
                      setLang(item);
                      setLangOpen(false);
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="dropdown">
            <button
              className="dropdown-btn"
              onClick={() => {
                setCurrencyOpen(!currencyOpen);
                setLangOpen(false);
              }}
            >
              {currency}
              <IoChevronDown />
            </button>

            {currencyOpen && (
              <ul className="dropdown-menu">
                {["USD", "UZS", "EUR"].map((item) => (
                  <li
                    key={item}
                    onClick={() => {
                      setCurrency(item);
                      setCurrencyOpen(false);
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
