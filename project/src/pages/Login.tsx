import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as loginService } from "../services/authService";
import { useAuth } from "../context/AuthContext";

const Login: React.FC = () => {
  const [emailOrMobile, setEmailOrMobile] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await loginService(emailOrMobile, password);
      login(data.token); // set token + update context
      alert("Login successful!");
      navigate("/products");
    } catch (err: any) {
      alert(err.message || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left login-bg">
        <h2>New here?</h2>
        <p>Welcome Back</p>
        <Link to="/register" className="btn btn-outline-light">
          Sign Up
        </Link>
      </div>
      <div className="auth-right">
        <h2>Sign in</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email or Mobile Number"
            value={emailOrMobile}
            onChange={(e) => setEmailOrMobile(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
