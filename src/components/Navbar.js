import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

// Navigation bar component
// Provides links to all portfolio pages required by the assignment
export default function Navbar() {
  return (
    <header>
      <nav className="navbar" role="navigation" aria-label="Main navigation">
        <Link to="/" className="logo-link" aria-label="Home">
          <img src={logo} alt="Aditya Shoor logo" className="logo" />
        </Link>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Me</Link></li>
          <li><Link to="/projects">Projects</Link></li>
          <li><Link to="/education">Education</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}