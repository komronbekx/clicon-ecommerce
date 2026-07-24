import React, { useState } from "react";
import { LuArrowRight } from "react-icons/lu";
import "./Newsletter.css";

// Brend logotiplari ro'yxati (ixtiyoriy brendlar qo'shish uchun)
const partnerLogos = [
  {
    id: 1,
    name: "Google",
    icon: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  },
  {
    id: 2,
    name: "Amazon",
    icon: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  },
  {
    id: 3,
    name: "Philips",
    icon: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Philips_logo.svg",
  },
  {
    id: 4,
    name: "Toshiba",
    icon: "https://upload.wikimedia.org/wikipedia/commons/0/02/Toshiba_logo.svg",
  },
  {
    id: 5,
    name: "Samsung",
    icon: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg",
  },
];

function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Obuna bo'lingan e-mail: ${email}`);
      setEmail("");
    }
  };

  return (
    <section className="newsletter-section">
      <div className="container">
        {/* Sarlavha va Kichik matn */}
        <h2 className="newsletter-title">Subscribe to our newsletter</h2>
        <p className="newsletter-subtitle">
          Praesent fringilla erat a lacinia egestas. Donec vehicula tempor
          libero et <br />
          cursus. Donec non quam urna. Quisque vitae porta ipsum.
        </p>

        {/* E-mail Kiritish Formasi */}
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="subscribe-btn">
            SUBSCRIBE <LuArrowRight className="btn-icon" />
          </button>
        </form>

        {/* Brend Logotiplari */}
        <div className="newsletter-brands">
          {partnerLogos.map((logo) => (
            <div className="brand-item" key={logo.id}>
              <img src={logo.icon} alt={logo.name} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Newsletter;
