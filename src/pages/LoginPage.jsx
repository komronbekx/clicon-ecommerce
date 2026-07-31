import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaArrowRight } from "react-icons/fa";
import "./LoginPage.css";

function LoginPage() {
  const [isSignIn, setIsSignIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignIn) {
      const savedUser = JSON.parse(localStorage.getItem("registeredUser"));

      if (
        savedUser &&
        savedUser.email === formData.email &&
        savedUser.password === formData.password
      ) {
        localStorage.setItem("token", "logged-in-token");
        navigate("/profile");
      } else {
        alert("Email yoki parol xato! Yoki siz hali ro'yxatdan o'tmagansiz.");
      }
    } else {
      localStorage.setItem("registeredUser", JSON.stringify(formData));
      localStorage.setItem("token", "logged-in-token"); 

      alert("Ro'yxatdan muvaffaqiyatli o'tdingiz!");
      navigate("/profile");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-tabs">
          <button
            type="button"
            className={`tab-btn ${!isSignIn ? "active" : ""}`}
            onClick={() => setIsSignIn(false)}
          >
            Register
          </button>
          <button
            type="button"
            className={`tab-btn ${isSignIn ? "active" : ""}`}
            onClick={() => setIsSignIn(true)}
          >
            Sign In
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isSignIn && (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label>Ism</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Ali"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Familiya</label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Valiyev"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Telefon raqam</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="+998 90 123 45 67"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="example@gmail.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Parol</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="******"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button type="submit" className="auth-submit-btn">
            {isSignIn ? "SIGN IN" : "REGISTER"} <FaArrowRight />
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
