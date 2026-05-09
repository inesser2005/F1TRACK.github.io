import React, { useState } from "react";
import { auth } from "../firebase"; 
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/"); // Redirect to home after successful registration
    } catch (error) {
      alert("REGISTRATION_ERROR: " + error.message);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
      <div className="f1-card p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h3 className="fw-black italic text-uppercase mb-4">New Driver Registration</h3>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="small text-uppercase opacity-50 fw-bold">Email</label>
            <input 
              type="email" 
              className="form-control bg-black text-white border-secondary shadow-none" 
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="mb-4">
            <label className="small text-uppercase opacity-50 fw-bold">Password</label>
            <input 
              type="password" 
              className="form-control bg-black text-white border-secondary shadow-none" 
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="f1-btn w-100 mb-3">Create Account</button>
          
          <div className="text-center">
            <Link to="/login" className="small text-white opacity-50 text-decoration-none italic">
              ALREADY REGISTERED? LOG IN HERE
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}