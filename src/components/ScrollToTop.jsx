import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Con HashRouter los links a secciones son "/#id": la ruta es "/" y el hash es "#id".
// Dependemos de `key` para que repetir el mismo link vuelva a hacer scroll.
export default function ScrollToTop() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }
    // Espera a que la página monte antes de buscar la sección
    const timer = setTimeout(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" });
    }, 120);
    return () => clearTimeout(timer);
  }, [pathname, hash, key]);

  return null;
}
