import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaPhone,
  FaEnvelope,
  FaUser,
} from "react-icons/fa";
import "./ProfilePage.css";

function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // LocalStorage'dan registratsiya ma'lumotlarini olamiz
    const savedUser = JSON.parse(localStorage.getItem("registeredUser"));

    if (savedUser) {
      setUser(savedUser);
    } else {
      // Ma'lumot topilmasa loginga qaytaradi
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <FaUserCircle className="profile-avatar" />
          <div className="profile-header-info">
            <h2>
              {user.firstName} {user.lastName}
            </h2>
            <p>{user.email}</p>
          </div>
        </div>

        <div className="profile-details">
          <div className="detail-item">
            <FaUser className="detail-icon" />
            <div>
              <small>To'liq Ismi:</small>
              <p>
                {user.firstName} {user.lastName}
              </p>
            </div>
          </div>

          <div className="detail-item">
            <FaEnvelope className="detail-icon" />
            <div>
              <small>Email address:</small>
              <p>{user.email}</p>
            </div>
          </div>

          <div className="detail-item">
            <FaPhone className="detail-icon" />
            <div>
              <small>Telefon raqami:</small>
              <p>{user.phone}</p>
            </div>
          </div>
        </div>

        <button type="button" className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /> Chiqish (Log out)
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;