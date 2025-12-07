import { useState, useEffect } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // 1. Add logic to close the sidebar on resize for larger screens
  useEffect(() => {
    const handleResize = () => {
      // Assuming 768px is the breakpoint for mobile menu
      if (window.innerWidth > 768 && open) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [open]);

  return (
    <header className="fixed-header">
      {/* Top Navbar */}
      <nav className="navbar">
        <div className="logo-title">
          <a href="/">
            <img src={logo} alt="Logo" className="logo" />
          </a>
          <div className="titleContainer">
            <h1>M D Tours and Travels</h1>
            <p>Travel with Ease, Travel with Us..</p>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/international">International</Link>
          <Link to="/domestic">Domestic</Link>
          <Link to="/cruise">Cruise</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>

        {/* Mobile Toggle Button */}
        <button className="menu-btn" onClick={() => setOpen(!open)}>
          {open ? "✖" : "☰"}
        </button>
      </nav>

      {/* Sidebar (Mobile) */}
      {open && (
        <aside className="sidebar">
          <ul>
            <li onClick={() => setOpen(false)}>
              <Link to="/">Home</Link>
            </li>
            <li onClick={() => setOpen(false)}>
              <Link to="/international">International</Link>
            </li>
            <li onClick={() => setOpen(false)}>
              <Link to="/domestic">Domestic</Link>
            </li>
            <li onClick={() => setOpen(false)}>
              <Link to="/cruise">Cruise</Link>
            </li>
            <li onClick={() => setOpen(false)}>
              <Link to="/about">About</Link>
            </li>
            <li onClick={() => setOpen(false)}>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </aside>
      )}
    </header>
  );
}
