import { useState, useEffect } from 'react';

import { Menu, X } from 'lucide-react';
import logo from '../assets/grekaLogoSinBg.png';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <a href="/" className="logo">
          <img src={logo} alt="Greka Arquitectos" />
        </a>

        <div className={`nav-links ${isOpen ? 'active' : ''}`}>
          <a href="#about" onClick={() => setIsOpen(false)}>NOSOTROS</a>
          <a href="#projects" onClick={() => setIsOpen(false)}>PROYECTOS</a>
          <a href="#services" onClick={() => setIsOpen(false)}>SERVICIOS</a>
          <a href="#contact" onClick={() => setIsOpen(false)}>CONTACTO</a>
        </div>

        <div className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
