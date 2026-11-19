import { useState, useEffect } from "react";

const Navbar = ({ darkMode, setDarkMode }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "services", "contact"];

      let currentSection = "home";

      sections.forEach((id) => {
        const section = document.getElementById(id);

        if (section && section.getBoundingClientRect().top <= 150) {
          currentSection = id;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleContactClick = () => {
    setMenuOpen(false);

    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <nav>
      <h2 className={activeSection === "home" ? "clinic-name visible" : "clinic-name"}>
  Immaculate Maternity Clinic
</h2>

      <button
        className="menu-button"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation menu"
      >
        ☰
      </button>

      <div className={menuOpen ? "nav-links open" : "nav-links"}>
        <a
          href="#home"
          className={activeSection === "home" ? "current-section" : ""}
          onClick={() => setMenuOpen(false)}
        >
          Home
        </a>

        <a
          href="#about"
          className={activeSection === "about" ? "current-section" : ""}
          onClick={() => setMenuOpen(false)}
        >
          About
        </a>

        <a
          href="#services"
          className={activeSection === "services" ? "current-section" : ""}
          onClick={() => setMenuOpen(false)}
        >
          Services
        </a>

        <a
          href="#contact"
          className={activeSection === "contact" ? "current-section" : ""}
          onClick={() => setMenuOpen(false)}
        >
          Contact
        </a>
        <button type="button" onClick={handleContactClick}>
          Book Appointment
        </button>
      </div>

      <div className="nav-actions">
        <button
          className="theme-button"
          onClick={() => setDarkMode(!darkMode)}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
