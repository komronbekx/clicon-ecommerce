import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaInfoCircle } from "react-icons/fa";
import "./TrackOrder.css";

function TrackOrder() {
  const [orderId, setOrderId] = useState("");
  const [billingEmail, setBillingEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!orderId || !billingEmail) {
      alert("Iltimos, Order ID va Email manzilingizni kiriting!");
      return;
    }
    alert(`Order ID: ${orderId} bo'yicha qidirilmoqda...`);
  };

  return (
    <div className="track-order-page">
      {/* Breadcrumb Navigation */}
      <div className="breadcrumb">
        <div className="container breadcrumb-content">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/pages">Pages</Link>
          <span>/</span>
          <span className="active">Track Order</span>
        </div>
      </div>

      {/* Main Track Order Content */}
      <div className="container">
        <div className="track-order-container">
          <div className="track-order-header">
            <h2>Track Order</h2>
            <p>
              To track your order please enter your order ID in the input field
              below and press the "Track Order" button. This was given to you on
              your receipt and in the confirmation email you should have
              received.
            </p>
          </div>

          <form className="track-order-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Order ID</label>
                <input
                  type="text"
                  placeholder="ID..."
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Billing Email</label>
                <input
                  type="email"
                  placeholder="Email address"
                  value={billingEmail}
                  onChange={(e) => setBillingEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="info-note">
              <FaInfoCircle style={{ color: "#2da5f3" }} />
              <span>Order ID that we sent to you in your email address.</span>
            </div>

            <button type="submit" className="track-btn">
              TRACK ORDER <FaArrowRight />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TrackOrder;
