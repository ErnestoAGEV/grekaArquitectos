import { Instagram, Linkedin, Facebook } from "lucide-react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-links">
          <a href="#">GREKA ARQUITECTOS</a> |{" "}
          <a href="mailto:facturas.greka@gmail.com">facturas.greka@gmail.com</a>{" "}
          | Colima Colima
        </div>
        <div className="social-links">
          <a href="#" aria-label="LinkedIn">
            <Linkedin size={20} />
          </a>
          <a href="#" aria-label="Instagram">
            <Instagram size={20} />
          </a>
          <a href="#" aria-label="Facebook">
            <Facebook size={20} />
          </a>
        </div>
        <div className="copyright">
          &copy; {new Date().getFullYear()} Greka Arquitectos. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
