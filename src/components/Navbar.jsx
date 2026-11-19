
import React, { useState } from 'react';

const Navbar = ({ darkMode, setDarkMode }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleContactClick = () => {
    setMenuOpen(false);
    document.getElementById('contact')?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <nav>
      <h2>Immaculate Maternity Clinic</h2>

      <button
        className="menu-button"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation menu"
      >
        ☰
      </button>

      <div className={menuOpen ? "nav-links open" : "nav-links"}>
        <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
        <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
        <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
        <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>

        <button
          className="theme-button"
          onClick={() => setDarkMode(!darkMode)}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        <button type="button" onClick={handleContactClick}>
          Book Appointment
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
