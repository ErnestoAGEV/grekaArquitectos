import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import "./Services.css";

const services = [
  {
    title: "Residencial",
    text: "Diseñamos y construimos casas a la medida de tu forma de vivir: distribución, luz, materiales y acabados.",
    tags: ["Casas", "Remodelaciones", "Ampliaciones"],
  },
  {
    title: "Comercial e interiorismo",
    text: "Creamos tiendas y locales que ordenan el recorrido, lucen el producto y funcionan para tu operación diaria.",
    tags: ["Tiendas", "Locales", "Oficinas"],
  },
  {
    title: "Urbano",
    text: "Proyectamos espacios públicos y desarrollos que se integran a su entorno y a la comunidad que los usa.",
    tags: ["Espacio público", "Desarrollos"],
  },
  {
    title: "Industrial",
    text: "Planeamos naves e instalaciones eficientes, pensadas para el proceso productivo y para crecer.",
    tags: ["Naves", "Bodegas"],
  },
];

const Services = () => (
  <section className="section services" id="services">
    <div className="container">
      <div className="section-head">
        <Reveal>
          <p className="label">02 — Servicios</p>
          <h2 className="display">Lo que hacemos</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p>
            Diseñamos, desarrollamos el proyecto ejecutivo y acompañamos la obra. Puedes contar con
            nosotros en todo el proceso o sólo en la etapa que necesites.
          </p>
        </Reveal>
      </div>

      <ol className="services-list">
        {services.map((s, i) => (
          <Reveal as="li" key={s.title} delay={i * 0.06}>
            <Link to="/#contact" className="service-row">
              <span className="label service-num">0{i + 1}</span>
              <h3 className="service-title">{s.title}</h3>
              <div className="service-body">
                <p>{s.text}</p>
                <ul className="service-tags" aria-label="Incluye">
                  {s.tags.map((t) => (
                    <li key={t} className="label">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <ArrowUpRight className="service-arrow" size={28} strokeWidth={1.25} aria-hidden="true" />
            </Link>
          </Reveal>
        ))}
      </ol>
    </div>
  </section>
);

export default Services;
