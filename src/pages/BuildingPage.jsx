import React from "react";
import { Link } from "react-router-dom";
import { FaTools, FaArrowLeft } from "react-icons/fa";
import "./BuildingPage.css";

function BuildingPage() {
  return (
    <div className="container">
      <div className="building-card">
        <div className="building-icon-box">
          <FaTools className="building-icon" />
        </div>

        <h2>Sahifa tayyorlanmoqda</h2>

        <p>
          Ushbu sahifa hozirda ishlab chiqish jarayonida. Tez orada ushbu bo'lim
          ishga tushiriladi!
        </p>

        <Link to="/" className="back-home-btn">
          <FaArrowLeft /> Bosh sahifaga qaytish
        </Link>
      </div>
    </div>
  );
}

export default BuildingPage;
