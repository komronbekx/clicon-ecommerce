import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaTimes,
  FaPlus,
  FaMinus,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { useCart } from "../components/context/CartContext";
import "./CartPage.css";

function CartPage() {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, subTotal } = useCart();

  const shipping = 0; 
  const tax = subTotal > 0 ? 61.99 : 0;
  const discount = subTotal > 0 ? 24.0 : 0;
  const total = subTotal > 0 ? subTotal + tax - discount : 0;

  return (
    <div className="cart-page">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Home</Link> &gt;{" "}
          <span className="active">Shopping Cart</span>
        </div>

        <h2 className="page-title">Shopping Cart</h2>

        <div className="cart-layout">
          <div className="cart-main-content">
            <div className="cart-table-wrapper">
              <table className="cart-table">
                <thead>
                  <tr>
                    <th>PRODUCTS</th>
                    <th>PRICE</th>
                    <th>QUANTITY</th>
                    <th>SUB-TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems && cartItems.length > 0 ? (
                    cartItems.map((item) => (
                      <tr key={item.id}>
                        <td className="product-cell">
                          <button
                            type="button"
                            className="remove-btn"
                            onClick={() => removeFromCart(item.id)}
                            title="Remove product"
                          >
                            <FaTimes />
                          </button>
                          <img
                            src={item.image || item.thumbnail}
                            alt={item.title || item.name}
                            className="product-img"
                          />
                          <span className="product-title">
                            {item.title || item.name}
                          </span>
                        </td>

                        <td className="price-cell">
                          ${item.price?.toLocaleString()}
                        </td>

                        <td className="quantity-cell">
                          <div className="qty-control">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  (item.quantity || 1) - 1,
                                )
                              }
                            >
                              <FaMinus />
                            </button>
                            <span>
                              {String(item.quantity || 1).padStart(2, "0")}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  (item.quantity || 1) + 1,
                                )
                              }
                            >
                              <FaPlus />
                            </button>
                          </div>
                        </td>

                        <td className="subtotal-cell">
                          $
                          {(
                            (item.price || 0) * (item.quantity || 1)
                          ).toLocaleString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="empty-cart-msg">
                        Sizning savatchangiz bo'sh.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="cart-actions">
              <button
                type="button"
                className="btn-return"
                onClick={() => navigate("/")}
              >
                <FaArrowLeft /> RETURN TO SHOP
              </button>
              <button type="button" className="btn-update">
                UPDATE CART
              </button>
            </div>
          </div>

          <div className="cart-sidebar">
            <div className="summary-card">
              <h3>Card Totals</h3>
              <div className="summary-row">
                <span>Sub-total</span>
                <strong>${subTotal?.toLocaleString()}.00</strong>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="summary-row">
                <span>Discount</span>
                <span>${discount.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <hr />
              <div className="summary-row total-row">
                <span>Total</span>
                <strong>${total > 0 ? total.toFixed(2) : "0.00"} USD</strong>
              </div>

              <button
                type="button"
                className="btn-proceed"
                onClick={() => navigate("/checkout")}
                disabled={cartItems.length === 0}
              >
                PROCEED TO CHECKOUT <FaArrowRight />
              </button>
            </div>

            <div className="summary-card coupon-card">
              <h3>Coupon Code</h3>
              <div className="coupon-input-group">
                <input type="text" placeholder="Enter code" />
                <button type="button" className="btn-apply">
                  APPLY COUPON
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
