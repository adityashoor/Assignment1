import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.svg";

// Navigation bar component with a simple hamburger menu for small screens.
export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header>
      <nav className="navbar" role="navigation" aria-label="Main navigation">
        <Link to="/" className="logo-link" aria-label="Home" onClick={() => setOpen(false)}>
          <img src={logo} alt="Aditya Shoor logo" className="logo" />
        </Link>

        <button
          className="nav-toggle"
          aria-controls="primary-navigation"
          aria-expanded={open}
          onClick={() => setOpen(o => !o)}
        >
          <span className="sr-only">Toggle navigation</span>
          <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="currentColor" d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
          </svg>
        </button>

        <ul id="primary-navigation" className={open ? "nav-links open" : "nav-links"}>
          <li><Link to="/" onClick={() => setOpen(false)}>Home</Link></li>
          <li><Link to="/about" onClick={() => setOpen(false)}>About Me</Link></li>
          <li><Link to="/projects" onClick={() => setOpen(false)}>Projects</Link></li>
          <li><Link to="/education" onClick={() => setOpen(false)}>Education</Link></li>
          <li><Link to="/services" onClick={() => setOpen(false)}>Services</Link></li>
          <li><Link to="/contact" onClick={() => setOpen(false)}>Contact</Link></li>
          {process.env.NODE_ENV !== 'production' && (
            <li><Link to="/admin" onClick={() => setOpen(false)}>Admin</Link></li>
          )}
          {/* User auth links */}
          {(() => {
            try {
              const u = JSON.parse(localStorage.getItem('user') || 'null');
              if (u && u.name) {
                return (
                  <li>
                    <button onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('user'); window.location.href = '/'; }} style={{background:'none',border:'none',cursor:'pointer'}}>Hi, {u.name} (Sign out)</button>
                  </li>
                );
              }
            } catch { /* ignore */ }
            return <li><Link to="/auth" onClick={() => setOpen(false)}>Sign in</Link></li>;
          })()}
        </ul>
      </nav>
    </header>
  );
}