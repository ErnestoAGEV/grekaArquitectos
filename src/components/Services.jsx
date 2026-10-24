import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import { useContent } from "../data/useContent";
import "./Services.css";

const Services = () => {
  const { title, intro, items: services } = useContent().site.services;

  return (
  <section className="section services" id="services">
    <div className="container">
      <div className="section-head">
        <Reveal>
          <p className="label">02 — Servicios</p>
          <h2 className="display">{title}</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p>{intro}</p>
        </Reveal>
      </div>

      <ol className="services-list">
        {services.map((s, i) => (
          <Reveal as="li" key={i} delay={i * 0.06}>
            <Link to="/#contact" className="service-row">
              <span className="label service-num">0{i + 1}</span>
              <h3 className="service-title">{s.title}</h3>
              <div className="service-body">
                <p>{s.text}</p>
                <ul className="service-tags" aria-label="Incluye">
                  {(s.tags ?? []).map((t) => (
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
};

export default Services;
