

import { useState } from "react";
import axios from "axios";
import BASE_URL from "../api";
import { Link, useNavigate } from "react-router-dom";
import "../AuthStyles.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("consumer");

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post(`${BASE_URL}/register`, {
        email,
        password,
        role // ✅ send selected role
      });

      alert("Registered successfully");

      // redirect after register
      role === "creator" ? navigate("/creator") : navigate("/");

    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="brand">▲ Scalable Coursework</div>

        <div className="form-header">
          <h2>Create Account</h2>
          <p>Please enter your details to get started</p>
        </div>

        {/* 🔥 ROLE SELECT */}
        <div className="auth-tabs">
          <button
            className={`tab ${role === "consumer" ? "active" : ""}`}
            onClick={() => setRole("consumer")}
          >
            Consumer
          </button>

          <button
            className={`tab ${role === "creator" ? "active" : ""}`}
            onClick={() => setRole("creator")}
          >
            Creator
          </button>
        </div>

        <div className="input-group">
          <label>Email Address</label>
          <input
            type="email"
            placeholder="example@email.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="btn-primary" onClick={handleRegister}>
          Continue
        </button>

        <p className="footer-text">
          By signing up, you agree to the terms.
        </p>

        <Link to="/login">Already have an account? Login</Link>
      </div>

      <div className="auth-right">
        <div className="visual-card"></div>
      </div>
    </div>
  );
}

export default Register;