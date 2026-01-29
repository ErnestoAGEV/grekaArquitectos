import { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom"; // Import routing hooks
import { Menu, X } from "lucide-react";
import logo from "../assets/grekaLogoSinBg.png";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  // Helper to determine link target
  const getLinkTarget = (sectionId) => {
    if (location.pathname === "/") {
      return `#${sectionId}`;
    } else {
      return `/#${sectionId}`;
    }
  };

  // Custom click handler to close menu and allow smooth scroll on home
  const handleLinkClick = (e, sectionId) => {
    setIsOpen(false);

    // If we are already on home, let the native anchor behavior (enhanced by CSS smooth scroll) work
    // But Link with hash usually works too.
    // If we are definitely on home, we might want to manually scroll if behavior is inconsistent
    if (location.pathname === "/") {
      // e.preventDefault(); // Un-comment if standard anchor jumping is annoying, but CSS scroll-behavior usually handles it nicely
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container navbar-container">
        <Link to="/" className="logo">
          <img src={logo} alt="Greka Arquitectos" />
        </Link>

        <div className={`nav-links ${isOpen ? "active" : ""}`}>
          <Link
            to={getLinkTarget("about")}
            onClick={(e) => handleLinkClick(e, "about")}
          >
            NOSOTROS
          </Link>
          <Link
            to={getLinkTarget("projects")}
            onClick={(e) => handleLinkClick(e, "projects")}
          >
            PROYECTOS
          </Link>
          <Link
            to={getLinkTarget("services")}
            onClick={(e) => handleLinkClick(e, "services")}
          >
            SERVICIOS
          </Link>
          <Link
            to={getLinkTarget("contact")}
            onClick={(e) => handleLinkClick(e, "contact")}
          >
            CONTACTO
          </Link>
        </div>

        <div className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
