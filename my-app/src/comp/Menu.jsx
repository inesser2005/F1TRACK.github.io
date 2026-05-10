import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import f1Logo from "../assets/F1TRACKER_LOGO.png";


export default function Menu() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("LOGOUT_ERROR:", error.message);
    }
  };

  const isActive = (path) => location.pathname === path ? "active" : "";

  const menuItems = ["Home", "Drivers", "Teams", "Tracks", "News", "Weather"];

  return (
    <Navbar expand="lg" sticky="top" variant="dark" className="f1-navbar py-0 navbar-dark">
      <Container fluid className="px-4">
        <Navbar.Brand as={Link} to="/" className="f1-brand d-flex align-items-center">
          <span className="fw-black italic text-white">
            <img src={f1Logo} alt="Logo" />
          </span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="f1-navbar-nav" className="border-0 custom-toggler" />
        <Navbar.Collapse id="f1-navbar-nav">
          <Nav className="ms-auto align-items-lg-center">
            {menuItems.map((item) => {
              const path = item === "Home" ? "/" : `/${item.toLowerCase()}`;
              return (
                <Nav.Link
                  key={item}
                  as={Link}
                  to={path}
                  className={`f1-nav-link ${isActive(path)}`}
                >
                  {item}
                </Nav.Link>
              );
            })}

            {/* Auth Logic: Toggle Profile/Logout vs Login/Register */}
            {user ? (
              <div className="d-flex align-items-center ms-lg-3">
                {/* Profile Link with Avatar */}
                <Nav.Link
                  as={Link}
                  to="/profile"
                  className={`f1-nav-link d-flex align-items-center ${isActive("/profile")}`}
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="Driver"
                      className="rounded-circle border border-danger me-2"
                      style={{ width: '28px', height: '28px', objectFit: 'cover' }}
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span className="me-2">PROFILE</span>
                  )}
                </Nav.Link>

                <span className="text-white opacity-50 small mx-2 italic d-none d-lg-block">
                  {user.displayName || user.email}
                </span>

                <button
                  onClick={handleLogout}
                  className="f1-btn py-1 px-3 ms-lg-2 mt-2 mt-lg-0"
                  style={{ fontSize: '0.7rem' }}
                >
                  LOGOUT
                </button>
              </div>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className={`f1-nav-link ${isActive("/login")}`}>
                  LOGIN
                </Nav.Link>
                <Nav.Link as={Link} to="/register" className={`f1-nav-link ${isActive("/register")}`}>
                  REGISTER
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
