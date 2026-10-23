import { Link } from "react-router-dom";
import { Facebook } from "lucide-react";
import "./Footer.css";

const nav = [
  ["about", "Nosotros"],
  ["services", "Servicios"],
  ["projects", "Proyectos"],
  ["process", "Proceso"],
  ["faq", "Preguntas"],
  ["contact", "Contacto"],
];

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer-grid">
        <div>
          <p className="footer-claim">
            Arquitectura e interiorismo
            <br />
            desde Colima.
          </p>
          <Link to="/#contact" className="btn footer-btn">
            Cotiza tu proyecto
          </Link>
        </div>

        <nav aria-label="Pie de página">
          <p className="label">Navegación</p>
          <ul>
            {nav.map(([id, label]) => (
              <li key={id}>
                <Link to={`/#${id}`}>{label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="label">Contacto</p>
          <ul>
            <li>Gral. Silverio Núñez 393, Centro, Colima</li>
            <li>
              <a href="tel:+523123143828">312 314 3828</a>
            </li>
            <li>
              <a href="mailto:facturas.greka@gmail.com">facturas.greka@gmail.com</a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/greka.arquitectos"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social"
              >
                <Facebook size={16} aria-hidden="true" /> Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>

      <p className="footer-wordmark display" aria-hidden="true">
        Greka
      </p>

      <div className="footer-bottom label">
        <span>© {new Date().getFullYear()} Greka Arquitectos</span>
        <span>Colima, México</span>
      </div>
    </div>
  </footer>
);

export default Footer;
