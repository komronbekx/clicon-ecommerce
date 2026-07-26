import React, { useState } from "react";
import {
  FaArrowRight,
  FaCreditCard,
  FaPaypal,
  FaMoneyBillAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./CheckoutPage.css";

function CheckoutPage({ cartItems = [] }) {
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("card");

  // Sub-total va umumiy summa
  const subTotal = cartItems.reduce(
    (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
    0,
  );
  const shipping = 0; // Free
  const tax = subTotal > 0 ? 61.99 : 0;
  const discount = subTotal > 0 ? 24 : 0;
  const total = subTotal > 0 ? subTotal + tax - discount : 0;

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    alert("Buyurtmangiz muvaffaqiyatli qabul qilindi!");
    navigate("/"); // Bosh sahifaga qaytarish
  };

  return (
    <div className="checkout-page">
      <div className="breadcrumb">
        <span>Home</span> &gt; <span>Shopping Cart</span> &gt;{" "}
        <span className="active">Checkout</span>
      </div>

      <div className="container checkout-container">
        {/* CHAP TOMON: Billing Information */}
        <div className="checkout-main">
          <h3 className="section-title">Billing Information</h3>

          <form id="checkout-form" onSubmit={handleSubmitOrder}>
            <div className="form-row">
              <div className="form-group">
                <label>First name</label>
                <input type="text" placeholder="First name" required />
              </div>
              <div className="form-group">
                <label>Last name</label>
                <input type="text" placeholder="Last name" required />
              </div>
              <div className="form-group">
                <label>Company Name (Optional)</label>
                <input type="text" placeholder="Company Name" />
              </div>
            </div>

            <div className="form-group full-width">
              <label>Address</label>
              <input type="text" placeholder="Street Address" required />
            </div>

            <div className="form-row four-cols">
              <div className="form-group">
                <label>Country</label>
                <select required defaultValue="Uzbekistan">
                  <option value="Uzbekistan">Uzbekistan</option>
                  <option value="USA">United States</option>
                  <option value="UK">United Kingdom</option>
                </select>
              </div>
              <div className="form-group">
                <label>Region/State</label>
                <input type="text" placeholder="Select region" required />
              </div>
              <div className="form-group">
                <label>City</label>
                <input type="text" placeholder="Select city" required />
              </div>
              <div className="form-group">
                <label>Zip Code</label>
                <input type="text" placeholder="Zip Code" required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="Email address" required />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" placeholder="Phone number" required />
              </div>
            </div>

            {/* Payment Option */}
            <h3 className="section-title" style={{ marginTop: "30px" }}>
              Payment Option
            </h3>

            <div className="payment-methods">
              <div
                className={`payment-card ${paymentMethod === "card" ? "active" : ""}`}
                onClick={() => setPaymentMethod("card")}
              >
                <FaCreditCard className="payment-icon" />
                <span>Credit Card</span>
              </div>
              <div
                className={`payment-card ${paymentMethod === "paypal" ? "active" : ""}`}
                onClick={() => setPaymentMethod("paypal")}
              >
                <FaPaypal className="payment-icon" />
                <span>Paypal</span>
              </div>
              <div
                className={`payment-card ${paymentMethod === "cash" ? "active" : ""}`}
                onClick={() => setPaymentMethod("cash")}
              >
                <FaMoneyBillAlt className="payment-icon" />
                <span>Cash on Delivery</span>
              </div>
            </div>

            {paymentMethod === "card" && (
              <div className="card-details-box">
                <div className="form-group full-width">
                  <label>Name on Card</label>
                  <input type="text" placeholder="Name on card" required />
                </div>
                <div className="form-group full-width">
                  <label>Card Number</label>
                  <input
                    type="text"
                    placeholder="4142 0000 0000 0000"
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Expire Date</label>
                    <input type="text" placeholder="MM/YY" required />
                  </div>
                  <div className="form-group">
                    <label>CVC / CVV</label>
                    <input type="text" placeholder="123" required />
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* O'NG TOMON: Order Summary */}
        <div className="checkout-sidebar">
          <div className="order-summary-box">
            <h4>Order Summary</h4>

            <div className="summary-items">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div className="summary-item" key={item.id}>
                    <img
                      src={item.image || item.thumbnail}
                      alt={item.title || item.name}
                    />
                    <div className="summary-item-info">
                      <p className="item-title">{item.title || item.name}</p>
                      <p className="item-qty-price">
                        {item.quantity || 1} x <span>${item.price}</span>
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ color: "#77878f", fontSize: "13px" }}>
                  Savatda mahsulot yo'q
                </p>
              )}
            </div>

            <div className="summary-totals">
              <div className="totals-row">
                <span>Sub-total</span>
                <span>${subTotal.toFixed(2)}</span>
              </div>
              <div className="totals-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="totals-row">
                <span>Discount</span>
                <span>${discount}</span>
              </div>
              <div className="totals-row">
                <span>Tax</span>
                <span>${tax}</span>
              </div>
              <hr />
              <div className="totals-row total-final">
                <span>Total</span>
                <strong>${total.toFixed(2)} USD</strong>
              </div>
            </div>

            <button
              type="submit"
              form="checkout-form"
              className="btn-place-order"
            >
              PLACE ORDER <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
