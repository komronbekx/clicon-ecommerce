import { Link } from "react-router-dom";
import {
  FaSearch,
  FaTruck,
  FaKey,
  FaCreditCard,
  FaUser,
  FaHeart,
  FaBox,
  FaShoppingCart,
  FaStore,
  FaPhoneAlt,
  FaComments,
  FaArrowRight,
} from "react-icons/fa";
import "./CustomerSupport.css";

function CustomerSupport() {
  const categories = [
    { id: 1, title: "Track Order", icon: <FaTruck />, path: "/track-order" },
    { id: 2, title: "Reset Password", icon: <FaKey />, path: "/coming-soon" },
    {
      id: 3,
      title: "Payment Option",
      icon: <FaCreditCard />,
      path: "/coming-soon",
    },
    { id: 4, title: "User & Account", icon: <FaUser />, path: "/profile" },
    {
      id: 5,
      title: "WishList & Compare",
      icon: <FaHeart />,
      path: "/wishlist",
    },
    {
      id: 6,
      title: "Shipping & Billing",
      icon: <FaBox />,
      path: "/coming-soon",
    },
    {
      id: 7,
      title: "Shopping Cart & Wallet",
      icon: <FaShoppingCart />,
      path: "/cart",
    },
    { id: 8, title: "Sell on Clicon", icon: <FaStore />, path: "/coming-soon" },
  ];

  const popularTopics = [
    [
      "How do I return my item?",
      "What is Clicon's Returns Policy?",
      "How long is the refund process?",
    ],
    [
      "What are the 'Delivery Timeframes'?",
      "What is 'Discover Your Daraz Campaign 2022'?",
      "What is the Voucher & Gift Offer in this Campaign?",
    ],
    [
      "How to cancel Clicon Order?",
      "Ask the Digital and Device Community",
      "How to change my shop name?",
    ],
  ];

  return (
    <div className="support-container">
      <div className="support-breadcrumb">
        <div className="container">
          <Link to="/">Home</Link> &gt; <span>Customer Support</span>
        </div>
      </div>

      <div className="support-hero">
        <div className="container support-hero-content">
          <div className="hero-text">
            <span className="badge">HELP CENTER</span>
            <h1>How we can help you!</h1>
            <div className="hero-search-box">
              <FaSearch className="search-icon" />
              <input type="text" placeholder="Enter your question or keyword" />
              <button type="button">SEARCH</button>
            </div>
          </div>
          <div className="hero-img">
            <img
              src="https://img.freepik.com/free-photo/friendly-smiling-female-customer-service-support-representative-headset_155003-43188.jpg"
              alt="Customer Support Agent"
            />
          </div>
        </div>
      </div>

      <div className="support-categories container">
        <h2>What can we assist you with today?</h2>
        <div className="categories-grid">
          {categories.map((cat) => (
            <Link to={cat.path} key={cat.id} className="category1-card">
              <span className="cat-icon">{cat.icon}</span>
              <span className="cat-title">{cat.title}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="popular-topics-section">
        <div className="container">
          <h2>Popular Topics</h2>
          <div className="topics-grid">
            {popularTopics.map((column, colIdx) => (
              <ul key={colIdx} className="topic-list">
                {column.map((topic, idx) => (
                  <li
                    key={idx}
                    className={
                      topic.includes("Returns Policy") ? "active-topic" : ""
                    }
                  >
                    • {topic}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>

      <div className="contact-section container">
        <div className="contact-badge">CONTACT US</div>
        <h2>
          Don't find your answer? <br /> Contact with us
        </h2>

        <div className="contact-cards">
          <div className="contact-card call-card">
            <div className="card-icon blue-bg">
              <FaPhoneAlt />
            </div>
            <div className="card-info">
              <h4>Call us now</h4>
              <p>
                We are available online from 9:00 AM to 5:00 PM (GMT+5:00). Talk
                with us now
              </p>
              <h3>+1-202-555-0126</h3>
              <button className="contact-btn blue-btn">
                CALL NOW <FaArrowRight />
              </button>
            </div>
          </div>

          <div className="contact-card chat-card">
            <div className="card-icon green-bg">
              <FaComments />
            </div>
            <div className="card-info">
              <h4>Chat with us</h4>
              <p>
                We are available online from 9:00 AM to 5:00 PM (GMT+5:00). Talk
                with us now
              </p>
              <h3>Support@clicon.com</h3>
              <button className="contact-btn green-btn">
                CONTACT US <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerSupport;
