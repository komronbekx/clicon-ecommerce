import React from "react";
import "./Features.css";

const features = [
  {
    icon: "📦",
    title: "FASTEST DELIVERY",
    text: "Delivery in 24H",
  },
  {
    icon: "🏆",
    title: "24 HOURS RETURN",
    text: "100% money-back guarantee",
  },
  {
    icon: "💳",
    title: "SECURE PAYMENT",
    text: "Your money is safe",
  },
  {
    icon: "🎧",
    title: "SUPPORT 24/7",
    text: "Live contact/message",
  },
];

function Features() {
  return (
    <div className="container">
      <div className="features">
        {features.map((item, index) => (
          <div className="feature-item" key={index}>
            <div className="feature-icon">{item.icon}</div>
            <div>
              <h4>{item.title}</h4>
              <p>{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Features;
