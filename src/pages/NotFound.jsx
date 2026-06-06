import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="not-found-content">
        <h1>404</h1>
        <p>La página que buscas no existe.</p>
        <Link to="/" className="btn">
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
