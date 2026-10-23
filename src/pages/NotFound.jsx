import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  useEffect(() => {
    document.title = "Página no encontrada | Greka Arquitectos";
  }, []);

  return (
    <main className="not-found container">
      <p className="label">Error 404</p>
      <h1 className="display">Este espacio aún no existe</h1>
      <p>La página que buscas no está aquí, pero podemos llevarte de vuelta.</p>
      <Link to="/" className="btn btn-solid">
        Volver al inicio
      </Link>
    </main>
  );
};

export default NotFound;
