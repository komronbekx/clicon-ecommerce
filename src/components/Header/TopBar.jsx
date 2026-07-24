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

          <div className="divider"></div>

          <span>
            Eng <IoChevronDown />
          </span>

          <span>
            USD <IoChevronDown />
          </span>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
