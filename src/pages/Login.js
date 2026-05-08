


import { useState } from "react";
import axios from "axios";
import BASE_URL from "../api";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "../AuthStyles.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/login`, {
        email,
        password
      });

      // ✅ CRITICAL FIX — persist user
      localStorage.setItem("user", JSON.stringify(res.data));

      // keep context working
      login(res.data);

      // 🔥 ROLE-BASED NAVIGATION
      if (res.data.role === "creator") {
        navigate("/creator");
      } else {
        navigate("/");
      }

    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="brand">▲ Scalable Coursework</div>
        
        <div className="form-header">
          <h2>Welcome Back</h2>
          <p>Welcome Back, Please enter Your details</p>
        </div>

        <div className="auth-tabs">
          <button className="tab active">Sign In</button>
          <Link to="/register"><button className="tab">Signup</button></Link>
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

        <button className="btn-primary" onClick={handleLogin}>
          Continue
        </button>

        <p className="footer-text">
          Na my coursework be this you wan use the app no lele. Log in 
          to access your personalized dashboard and enjoy the services.
        </p>
      </div>

      <div className="auth-right">
        <div className="visual-card"></div>
      </div>
    </div>
  );
}

export default Login;