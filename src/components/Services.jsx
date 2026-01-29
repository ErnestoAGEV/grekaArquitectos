import { Home, Building, Map, Factory } from "lucide-react";
import Reveal from "./Reveal";
import "./Services.css";

const Services = () => {
  const services = [
    {
      icon: <Home size={48} />,
      title: "RESIDENCIAL",
      description:
        "Diseño y construcción de viviendas personalizadas que reflejan tu estilo de vida.",
    },
    {
      icon: <Building size={48} />,
      title: "COMERCIAL",
      description:
        "Desarrollo de espacios comerciales innovadores que potencian tu negocio.",
    },
    {
      icon: <Map size={48} />,
      title: "URBANO",
      description:
        "Soluciones para entornos urbanos sostenibles y comunidades integradas.",
    },
    {
      icon: <Factory size={48} />,
      title: "INDUSTRIAL",
      description:
        "Infraestructura eficiente y funcional para optimizar procesos productivos.",
    },
  ];

  return (
    <section className="section services" id="services">
      <div className="container">
        <Reveal>
          <h2 className="section-title">SERVICIOS</h2>
        </Reveal>
        <div className="services-grid">
          {services.map((service, index) => (
            <Reveal key={index} delay={index * 0.1}>
              <div className="service-card">
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
