import { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import logo from "../assets/greka-logo.png";
import logoLight from "../assets/greka-logo-light.png";
import "./Navbar.css";

const links = [
  { id: "about", label: "Nosotros" },
  { id: "services", label: "Servicios" },
  { id: "projects", label: "Proyectos" },
  { id: "process", label: "Proceso" },
  { id: "contact", label: "Contacto" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const toggleRef = useRef(null);
  const reduce = useReducedMotion();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    // El resto de la página queda fuera del alcance del teclado y lectores de pantalla
    const behind = document.querySelectorAll("main, footer, .theme-toggle, .whatsapp-btn");
    behind.forEach((el) => (el.inert = true));
    const onKey = (e) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", onKey);
    const toggle = toggleRef.current;
    return () => {
      document.body.style.overflow = "";
      behind.forEach((el) => (el.inert = false));
      window.removeEventListener("keydown", onKey);
      toggle?.focus();
    };
  }, [isOpen]);

  const close = () => setIsOpen(false);

  const solid = scrolled || !isHome || isOpen;
  const menuTransition = reduce ? { duration: 0 } : { duration: 0.6, ease: [0.76, 0, 0.24, 1] };

  return (
    <>
      <header className={`navbar ${solid ? "is-solid" : ""} ${isOpen ? "is-open" : ""}`}>
        <div className="container navbar-inner">
          <Link to="/" className="navbar-logo" aria-label="Greka Arquitectos, inicio" onClick={close}>
            <img src={logo} alt="" className="logo-dark" width="420" height="194" />
            <img src={logoLight} alt="" className="logo-light" width="420" height="194" />
          </Link>

          <nav className="navbar-links" aria-label="Principal">
            {links.map((l) => (
              <Link key={l.id} to={`/#${l.id}`} onClick={close}>
                {l.label}
              </Link>
            ))}
          </nav>

          <Link to="/#contact" className="btn navbar-cta" onClick={close}>
            Cotiza tu proyecto
          </Link>

          <button
            ref={toggleRef}
            className="navbar-toggle"
            onClick={() => setIsOpen((o) => !o)}
            aria-expanded={isOpen}
            aria-controls={isOpen ? "mobile-menu" : undefined}
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* Fuera del header: su backdrop-filter recortaría este panel fijo */}
      <AnimatePresence>
          {isOpen && (
            <motion.nav
              id="mobile-menu"
              className="mobile-menu"
              aria-label="Menú móvil"
              initial={{ clipPath: "inset(0 0 100% 0)" }}
              animate={{ clipPath: "inset(0 0 0% 0)" }}
              exit={{ clipPath: "inset(0 0 100% 0)" }}
              transition={menuTransition}
            >
              <ol className="container">
                {links.map((l, i) => (
                  <motion.li
                    key={l.id}
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link to={`/#${l.id}`} onClick={close}>
                      <span className="label">0{i + 1}</span>
                      {l.label}
                    </Link>
                  </motion.li>
                ))}
              </ol>
            </motion.nav>
          )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
