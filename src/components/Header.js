import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Header({ onLoginClick }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`global-header${scrolled ? " scrolled" : ""}`}>
      <div className="global-header-content">
        {/* Logo links to home */}
        <Link to="/" style={{ display: "flex", alignItems: "center" }}>
          <img
            src={require('../yourlogo.png')}
            alt="Visa Services Logo"
            className="logo"
            style={{ height: 48, cursor: "pointer" }}
            tabIndex="0"
          />
        </Link>
        <nav className="global-nav">
          <a href="#services">Services</a>
          <a href="#apply">Apply Now</a>
          <Link to="/contact">Contact</Link>
        </nav>
        <button
          type="button"
          className="header-login-btn"
          onClick={onLoginClick}
          style={{ marginLeft: 24 }}
        >
          Login / Signup
        </button>
      </div>
    </header>
  );
}
