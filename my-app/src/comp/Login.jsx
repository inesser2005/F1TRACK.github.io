import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, showSessionAlert } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      alert("AUTH_ERROR: " + error.message);
    }
  };
  const { loginWithGoogle } = useAuth();

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      navigate("/"); // Redirect to dashboard on success
    } catch (error) {
      console.error("GOOGLE_AUTH_ERROR:", error.message);
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "70vh" }}
    >
      <div className="f1-card p-4" style={{ width: "100%", maxWidth: "400px" }}>
        {/* F1 Themed Session Alert: Appears when token expires */}
        {showSessionAlert && (
          <div
            className="bg-danger text-white p-2 mb-3 small italic fw-bold text-center"
            style={{ clipPath: "polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)" }}
          >
            SESSION EXPIRED: PLEASE RE-AUTHENTICATE
          </div>
        )}

        <h3 className="fw-black italic text-uppercase mb-4">
          User Authentication
        </h3>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="small text-uppercase opacity-50 fw-bold">
              Email
            </label>
            <input
              type="email"
              className="form-control bg-black text-white border-secondary shadow-none"
              value={email} // Two-way binding for state
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="small text-uppercase opacity-50 fw-bold">
              Password
            </label>
            <input
              type="password"
              className="form-control bg-black text-white border-secondary shadow-none"
              value={password} // Two-way binding for state
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="f1-btn w-100">
            Sign In
          </button>
          <button type="button" onClick={handleGoogleSignIn} className="f1-btn w-100 mt-3 f1-btn-secondary" >
            SIGN IN WITH GOOGLE
          </button>
        </form>
      </div>
    </div>
  );
}
