import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import "./ThemeToggle.css";

const ThemeToggle = () => {
  // index.html ya aplicó el tema guardado antes del render
  const [dark, setDark] = useState(() => document.documentElement.getAttribute("data-theme") === "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {
      // Sin almacenamiento disponible: el tema sólo dura esta visita
    }
  }, [dark]);

  return (
    <button
      className="theme-toggle"
      onClick={() => setDark(!dark)}
      aria-label={dark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
};

export default ThemeToggle;
