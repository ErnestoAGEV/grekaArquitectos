import { Home, Building, Map, Factory } from 'lucide-react';
import './Services.css';

const Services = () => {
    const services = [
        {
            icon: <Home size={48} />,
            title: "RESIDENCIAL",
            description: "Diseño y construcción de viviendas personalizadas que reflejan tu estilo de vida."
        },
        {
            icon: <Building size={48} />,
            title: "COMERCIAL",
            description: "Desarrollo de espacios comerciales innovadores que potencian tu negocio."
        },
        {
            icon: <Map size={48} />,
            title: "URBANO",
            description: "Soluciones para entornos urbanos sostenibles y comunidades integradas."
        },
        {
            icon: <Factory size={48} />,
            title: "INDUSTRIAL",
            description: "Infraestructura eficiente y funcional para optimizar procesos productivos."
        }
    ];

  return (
    <section className="section services" id="services">
      <div className="container">
        <h2 className="section-title">SERVICIOS</h2>
        <div className="services-grid">
            {services.map((service, index) => (
                <div key={index} className="service-card">
                    <div className="service-icon">{service.icon}</div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
